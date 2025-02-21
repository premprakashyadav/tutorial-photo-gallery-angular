import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ControllersService } from '../../services/controllers.service';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {
  oldpassword: string;
  newpassword: string;
  conpassword: string;
  id: any;

  constructor(public ctrl: ControllersService,
    private providerSvc: ProviderService) { }

  ngOnInit() {
  }

  updateData() {
    Storage.get({key: 'USER_INFO'}).then(data => {
      if(data && data.value != null) {
        const item = JSON.parse(data.value);
        this.id = item.patient_id;
      }
    }, error => {
      console.log(error);
    });

    if (this.oldpassword != null && this.newpassword != null && this.conpassword != null) {
      if (this.newpassword.length > 7) {
        if (this.newpassword.match(/[0-9]+/)) {
          if (this.newpassword.match(/[A-Z]+/)) {
            if (this.newpassword.match(/[a-z]+/)) {
              if (this.newpassword.match(/\W/)) {
                let dataPost = new FormData();
                dataPost.append('inputID', this.id);
                dataPost.append('inputOldPassword', this.oldpassword);
                dataPost.append('inputNewPassword', this.newpassword);
                dataPost.append('inputConPassword', this.conpassword);

                this.providerSvc.postData("profile-password.php", dataPost).subscribe(res => {

                  if (res[0] == 'error') {
                    this.ctrl.alertPopUp("Attention", "Error", "OK");
                  } else if (res[0] == 0) {
                    this.ctrl.alertPopUp("Attention", "Wrong Password", "OK");
                  } else if(res[0] == 1) {
                    this.ctrl.alertPopUp("Attention", "Password do not Match", "OK");
                  } else {
                    this.ctrl.alertPopUp("Successful", "Updated", "OK");
                    Storage.set({key: 'USER_INFO', value: JSON.stringify(res)}).then((data) => {});
                  }

                }, error => {
                  console.log(error);
                });
              } else {
                this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Special Character", "OK");
              }
            } else {
              this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Lowercase Letter", "OK");
            }
          } else {
            this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Capital Letter", "OK");
          }
        } else {
          this.ctrl.alertPopUp("Attention", "Password Must Contain At Least 1 Number", "OK");
        }
      } else {
        this.ctrl.alertPopUp("Attention", "Password Must At Least 8 Character", "OK");
      }  
    } else {
      this.ctrl.alertPopUp("Attention", "All Password Field are Required", "OK");
    }

  }

}
