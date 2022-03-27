import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ProviderService } from '../../services/provider.service';
import { ControllersService } from '../../services/controllers.service';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.page.html',
  styleUrls: ['./profile-address.page.scss'],
})
export class ProfileAddressPage implements OnInit {
  formData: any = {};
  id: string;
  items: any;

  constructor(public ctrl: ControllersService, 
    private providerSvc: ProviderService) { }

  ngOnInit() {
    this.getData();
    this.loadSelectValue();
  }

  getData() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value != null) {
        const item = JSON.parse(data.value);
        this.id = item.patient_id;
        this.formData.address = item.patient_address;
        this.formData.city = item.patient_city;
        this.formData.state = item.patient_state;
        this.formData.zipcode = item.patient_zipcode;
        this.formData.country = item.patient_country;
      }
    }, error => {
      console.log(error);
    });
  }

  Save() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value != null) {
        const item = JSON.parse(data.value);
        this.id = item.patient_id;
      }
    }, error => {
      console.log(error);
    });


    if (this.formData.address != null && this.formData.city != null && this.formData.state != null && this.formData.zipcode != null && this.formData.country != null) {
      if (!isNaN(this.formData.zipcode) && this.formData.zipcode.length < 6) {
        let dataPost = new FormData();
        dataPost.append('inputID', this.id);
        dataPost.append('inputAddress', this.formData.address);
        dataPost.append('inputCity', this.formData.city);
        dataPost.append('inputState', this.formData.state);
        dataPost.append('inputZipcode', this.formData.zipcode);
        dataPost.append('inputCountry', this.formData.country);

        this.providerSvc.postData("profile-address.php", dataPost).subscribe(res => {
          this.ctrl.alertPopUp("Successful", "Updated", "OK");
          Storage.set({key: 'USER_INFO', value: JSON.stringify(res)}).then((data) => {
            this.getData();
          });
        }, error => {
          console.log(error);
        });
      } else {
        this.ctrl.alertPopUp("Attention", "Zipcode only number and not exceed 5!", "Try Again");
      }
    } else {
      this.ctrl.alertPopUp("Attention", "All Field is Required!", "Try Again");
    }

  }

  loadSelectValue() {
    this.providerSvc.getData('select.php').subscribe(data => {
      if (data != null) {
        this.items = data;
      }
    });
  }

}
