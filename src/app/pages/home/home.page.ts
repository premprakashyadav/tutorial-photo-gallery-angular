import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ProviderService } from '../../services/provider.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any;
  patientID: any;
  patientFirstname: any;
  itemsApp: any;
  imgURL: string;

  clinicID: any;
  doctorID: string;
  appDate: any;
  appTime: any;
  doctorName: string;
  Speciality: string;
  doctorAvatar: string;
  currentDate: string;

  empty:number;

  constructor(private providerSvc: ProviderService, public datePipe: DatePipe) { }

  ngOnInit() {
    this.getData();
    this.promptNotify();
  }

  getData() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value != null) {
        this.items = JSON.parse(data.value);
        this.patientID = this.items.patient_id;
        this.patientFirstname = this.items.patient_firstname;
        this.getAppointmentData(this.patientID);
        this.imgURL = this.providerSvc.imgURL;
      }
    }, error => {
      console.log(error);
    });
  }

  getAppointmentData(patientID: number) {
    let postData = JSON.stringify({
      patientID: this.patientID
    });
    this.providerSvc.postData("appointment-list.php", postData).subscribe(appdata => {
      if (appdata != null) {
        this.clinicID = appdata[0].clinic_id;
        this.doctorID = appdata[0].doctor_id;
        this.doctorName = appdata[0].doctor_lastname +" "+ appdata[0].doctor_firstname;
        this.doctorAvatar = appdata[0].doctor_avatar;
        this.appDate = appdata[0].app_date;
        this.appTime = appdata[0].app_time;
        this.Speciality = appdata[0].speciality_name;
        this.empty = 0;

        var currentDate = this.datePipe.transform(new Date().toLocaleString(), 'yyyy-MM-dd');;        
        if (this.appDate > currentDate) {
          this.promptNotify();
        }
      } else {
        this.empty = 1;
        console.log("No Data Available");
      }
    }, error => {
      console.log("Load Failed", error);
    })
  }

  promptNotify() {
    LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'Reminder',
        body: 'Hey'+ this.patientFirstname +', Your have appointment with '+ this.doctorName +' on '+ this.appDate +' We are looking forward to seeing you at '+ this.appTime,
      
      }]});
  }

}
