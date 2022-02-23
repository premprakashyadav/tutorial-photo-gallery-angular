import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-medical-list',
  templateUrl: './medical-list.page.html',
  styleUrls: ['./medical-list.page.scss'],
})
export class MedicalListPage implements OnInit {
  id: number;
  items: any;

  constructor(private providerSvc: ProviderService) { }

  ngOnInit() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value !== null) {
        const item = JSON.parse(data.value);
        this.id = item.patient_id;
        this.getMedicalData(this.id);
      }
    }, error => {
      console.log(error);
    });
  }

  getMedicalData(id: number) {
    let postData = JSON.stringify({
      patientID: this.id
    });

    this.providerSvc.postData('medical_record.php', postData)
      .subscribe(data => {
        if (data != null) {
          this.items = data;
        } else {
          console.log('No Data Available');
        }
      }, error => {
        console.log('Load Failed', error);
      });
  }

  doRefresh(event) {
    this.getMedicalData(this.id);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
