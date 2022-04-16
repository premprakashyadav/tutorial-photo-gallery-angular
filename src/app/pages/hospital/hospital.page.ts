import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { UserPhoto, PhotoService } from '../../services/photo.service';
import { ControllersService } from '../../services/controllers.service';
import { ConstantData } from '../../../assets/constant';
import { ProviderService } from '../../services/provider.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;
  items: any;
  itemList: any;
  prescription = [];
  imgURL: string;
  attachmentImg = [];
  inputFormName = 'Hospital';
  patname;
  patcontact;
  lab_test;
  hospitalName;
  patientName;
  patientContact;
  consultDocName;
  consultDocContact;
  refDocName;
  refDocContact;
  message;
  attachment;
  email;
  doctorID: any;
  inputPatientEmail: string | Blob;

  constructor(public activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private ctrl: ControllersService,
    public photoService: PhotoService,
    public constantData: ConstantData,
    private modalController: ModalController,
    private providerSvc: ProviderService,
    public alertController: AlertController,
    private router: Router) { }

  async ngOnInit() {
    this.doctorID = this.activatedRoute.snapshot.params['did'];
    this.itemList = this.constantData.healthCheckData;
    this.getData();
  }

  getData() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value != null) {
        this.items = JSON.parse(data.value);
        this.patname = this.items.patient_firstname;
        this.patcontact = this.items.patient_contact;
        this.email = this.items.patient_email;
      }
    }, error => {
      console.log(error);
    });
  }


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

  itemChange($event) {
    console.log($event);
    this.lab_test = $event.target.value;
  }


  Book() {
    let dataPost = new FormData();
    Array.from(this.prescription)
    .forEach((file: File) => dataPost.append('attachment[]', file));
    dataPost.append('inputFormName', this.inputFormName);
    dataPost.append('hospitalName', this.hospitalName);
    dataPost.append('patientName', this.patientName);
    dataPost.append('patientContact', this.patientContact);
    dataPost.append('consultDocName', this.consultDocName);
    dataPost.append('consultDocContact', this.consultDocContact);
    dataPost.append('refDocName', this.refDocName);
    dataPost.append('refDocContact', this.refDocContact);
    dataPost.append('inputPatientEmail', this.email);
    dataPost.append('message', this.message);

    this.providerSvc.postData("appointment_hospital.php", dataPost).subscribe(async (res: any) => {
      if(res) {
      this.ctrl.presentLoading();
      this.presentToast();
    }
    (error) => {
      this.errorAlert(error);
      console.log(error);
    }
  });
}

async errorAlert(err) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: err.message,
    buttons: ['OK']
  });

  await alert.present();
}

async presentToast() {
  const toast = await this.toastCtrl.create({
    header: 'Booked Succesful',
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'checkmark-circle-outline',
        text: 'Booked!',
        handler: () => {
          this.router.navigate(['/tabs/appointment']);
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          this.router.navigate(['/tabs/home']);
        }
      }
    ]
  });
  toast.present();
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
      this.attachmentImg = [...this.attachmentImg, ...this.photoService.photos];
      this.prescription = [...this.prescription, ...this.photoService.photos];

    }

  }

  ionViewDidLeave() {
    this.attachmentImg = null;
  }
}
