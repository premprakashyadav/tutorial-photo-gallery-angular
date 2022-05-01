import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
              private plt: Platform,
              private router:Router,
              private http:HttpClient,
              public alertCtrl:AlertController,
              public loadingSvc:LoadingService,
              private providerSvc:ProviderService) {
    this.plt.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  ifLoggedIn() { // Can be check Token
    Storage.get({key: 'USER_INFO'}).then(res => {
      if (res && res.value) {
        this.authenticationState.next(true);
      }
    })
  }

  login(email: string, password: string) {
    this.loadingSvc.presentLoading();
    let dataPost = new FormData();
    dataPost.append('inputemail', email);
    dataPost.append('inputpass', password);

    let url: string = this.providerSvc.loginURL;

    let data: Observable<any> = this.http.post(url, dataPost);

    data.subscribe(res => {
      if (res[0] == 0) {
        this.loadingSvc.dismissLoading();
        this.alertPopUp("Attention", "Email & Password Incorrect!", "Try Again");
      } else {
        this.loadingSvc.dismissLoading();
        return Storage.set({key: 'USER_INFO', value: JSON.stringify(res[0])}).then((res) => {
          this.router.navigate(['tabs/home']);
          this.authenticationState.next(true);
        });
      }
    });

  }

  logout() {
    Storage.remove({key: 'USER_INFO'}).then(() => {
      this.router.navigate(['login']);
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  async alertPopUp(hdr: string, msg: string, btn: string) {
    let alert = await this.alertCtrl.create({
      header: hdr,
      subHeader: msg,
      buttons: [btn]
    });
    await alert.present();
  }

}
