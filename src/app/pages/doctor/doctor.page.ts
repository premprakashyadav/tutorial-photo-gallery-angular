import { AppointmentDetailPage } from '../appointment-detail/appointment-detail.page';
import { ReviewDetailsPage } from '../review-details/review-details.page';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { ProviderService } from '../../services/provider.service';
import { DatePipe } from '@angular/common';
import { UserPhoto, PhotoService } from '../../services/photo.service';
import { ControllersService } from '../../services/controllers.service';
import { SharedDataProvider } from '../../services/shared-data.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit, AfterViewInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;
  items: any;
  itemsSchedule: any;
  doctorID: any;
  clinicID: any;
  firstname: any;
  lastname: any;
  patientID: any;
  patientEmail: any;
  patientName: any;
  doctorName: any;
  prescription = [];
  imgURL: string;

  itemsSpec: any;

  minDate: string;
  attachmentImg = [];

  constructor(public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router,
    private providerSvc: ProviderService,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private sharedDataProvider: SharedDataProvider,
    private ctrl: ControllersService,
    public photoService: PhotoService) { }

  async ngOnInit() {
    this.doctorID = this.activatedRoute.snapshot.params['did'];
    this.getData(this.doctorID);
    this.getRating();

    Storage.get({ key: 'USER_INFO' }).then(data => {
      if (data && data.value != null) {
        const item = JSON.parse(data.value);
        this.patientID = item.patient_id;
        this.patientEmail = item.patient_email;
        this.patientName = item.patient_firstname + item.patient_lastname;
      }
    }, error => {
      console.log(error);
    });

    this.minDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    await this.photoService.loadSaved();
  }

  getData(id: number) {
    let postData = JSON.stringify({
      doctorID: id
    });

    this.providerSvc.postData('doctor_profile.php', postData).subscribe(data => {
      if (data != null) {
        this.items = data;
        console.log(data);

        this.lastname = this.items[0].doctor_lastname;
        this.firstname = this.items[0].doctor_firstname;
        this.doctorName = this.firstname + this.lastname;
        this.clinicID = this.items[0].clinic_id;
        this.imgURL = this.providerSvc.imgURL;
      }
    }, error => {
      console.log("Load Failed", error);
    });

    // this.providerSvc.postData('speciality_result.php', postData).subscribe(data => {
    //   if (data != null) {
    //     this.itemsSpec = data;
    //   }
    // })
  }

  countReviews: number;
  rate: any;
  totalReviewRate: number;
  rateitems: any;


  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }
  getRating() {
    let postData = JSON.stringify({
      doctorID: this.doctorID
    });
    this.providerSvc.postData('review-details.php', postData).subscribe(data => {
      if (data != null) {
        this.countReviews = Object.keys(data).length;

        var onecount = 0;
        var twocount = 0;
        var threecount = 0;
        var fourcount = 0;
        var fivecount = 0;

        for (var i = 0; i < this.countReviews; i++) {
          this.rate = parseInt(data[i].rating, 10);

          if (this.rate == 5) {
            fivecount++;
          } else if (this.rate == 4) {
            fourcount++;
          } else if (this.rate == 3) {
            threecount++;
          } else if (this.rate == 2) {
            twocount++;
          } else if (this.rate == 1) {
            onecount++;
          }
        }

        var roundTotal = (5 * fivecount + 4 * fourcount + 3 * threecount + 2 * twocount + 1 * onecount) / this.countReviews;
        this.totalReviewRate = Math.round(roundTotal * 10) / 10;
      } else {
        console.log('No Data Available');
      }
    }, error => {
      console.log(error);
    });
  }

  selectedTime: string;

  TimeSlotChange($event) {
    this.selectedTime = $event.target.value;
    console.log(this.selectedTime);
  }

  selectedDate: string;

  DateSlotChange($event) {
    this.selectedDate = this.datePipe.transform($event.target.value, 'yyyy-MM-dd');
    console.log(this.selectedDate);

    let dataPost = new FormData();
    dataPost.append('inputdate', this.selectedDate);
    dataPost.append('inputID', this.doctorID);

    this.providerSvc.postData("available.php", dataPost).subscribe(data => {
      this.itemsSchedule = data;
      console.log(this.itemsSchedule);
    }, error => {
      console.log(error);
    });
  }

  Book() {
    if (this.selectedDate != null && this.selectedTime != null) {
      this.openModal();
    } else {
      this.ctrl.alertPopUp("Attention", "Please select date & time", "OK");
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AppointmentDetailPage,
      componentProps: {
        date: this.selectedDate,
        time: this.selectedTime,
        doctorID: this.doctorID,
        clinicID: this.clinicID,
        patientID: this.patientID,
        patientEmail: this.patientEmail,
        patientName: this.patientName,
        doctorName: this.doctorName,
        prescription: [...this.prescription, ...this.photoService.photos]
      }
    });
    modal.onDidDismiss().then(dataReturned => {
    });
    // modal.onWillDismiss().then(dataReturned => {
    //   this.doctorID = dataReturned.data;
    // });

    return await modal.present();
  }

  async reviewModal() {
    const modal = await this.modalController.create({
      component: ReviewDetailsPage,
      componentProps: {
        doctorID: this.doctorID
      }
    });

    return await modal.present();
  }


  async presentActionSheet() {
    if (this.attachmentImg && this.attachmentImg.length >= 8) {

      this.toastCtrl.create({
        header: 'More than 8 attachment are not allowed.'
      });


    } else {
      let actionSheet = await this.actionSheetCtrl.create({
        header: 'Upload Prescriptions',
        buttons: [
          {
            text: 'Upload from Library',
            handler: () => {
              //this.openPicker()
              this.userInputElement.click();
            }
          },
          {
            text: 'Camera',
            handler: () => {
              this.opemcam()
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await actionSheet.present();
    }
  }

  loadImageFromDevice1(event) {
    this.prescription = event.target.files;
    this.attachmentImg = this.prescription;
    if (this.attachmentImg.length > 0) {
      if (this.photoService.photos.length > 0) {
        this.attachmentImg = [...this.attachmentImg, ...this.photoService.photos];
        this.prescription = [...this.prescription, ...this.photoService.photos];
      }
    }

  };

  ngAfterViewInit() {
    setTimeout(() => {
      this.userInputElement = this.userInputViewChild.nativeElement;
    }, 1000);
  };

  opemcam() {
    this.photoService.addNewToGallery();
    if (this.photoService.photos.length > 0) {
      debugger;
      this.attachmentImg = [...this.attachmentImg, ...this.photoService.photos];
      this.prescription = [...this.prescription, ...this.photoService.photos];

    }

  }


  openPicker() {
    // this.sharedDataProvider.openImagePicker(this.attachmentImg).then(data => {
    //   if (data && data.length > 0) {
    //     this.attachmentImg = data;
    //   }
    // })
  }

  viewImg(i) {
    // this.sharedDataProvider.viewImages('data:image/png;base64,' + i);
  }

  deleteImg(index) {
    this.attachmentImg.splice(index, 1);
  }
  ionViewDidLeave() {
    this.attachmentImg = null;
  }
}