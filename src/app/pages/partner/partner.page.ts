import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { UserPhoto, PhotoService } from '../../services/photo.service';
import { ControllersService } from '../../services/controllers.service';
import { ConstantData } from '../../../assets/constant';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;
  items: any;
  itemList: any;
  doctorID: any;
  clinicID: any;
  doctorName: any;
  prescription = [];
  imgURL: string;
  itemsSpec: any;
  minDate: string;
  attachmentImg = [];
  equipment = [];

  constructor(public activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private ctrl: ControllersService,
    public photoService: PhotoService,
    public constantData: ConstantData) { }

  async ngOnInit() {
    this.doctorID = this.activatedRoute.snapshot.params['did'];
    this.itemList = this.constantData.homeCareData;
    this.equipment = ['Yes', 'No'];
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

  selectedItem: string;

  itemChange($event) {
    this.selectedItem = $event.target.value;
    console.log(this.selectedItem);
  }

  equipmentItem: string;

  equipmentChange($event) {
    this.equipmentItem = $event.target.value;
    console.log(this.equipmentItem);
  }


  selectedDate: string;

  Book() {
    if (this.selectedDate != null && this.selectedItem != null) {
    } else {
      this.ctrl.alertPopUp("Attention", "Please select date & time", "OK");
    }
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

