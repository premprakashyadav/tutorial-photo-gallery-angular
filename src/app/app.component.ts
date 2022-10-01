import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen'
import { AlertController, Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router:Router,
    private authenticateService:AuthenticationService,
    private _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.showExitConfirm();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
      this.authenticateService.authenticationState.subscribe(state => {
        if(state) {
          this.router.navigate(['tabs/home']);
        } else {
          this.router.navigate(['login']);
        }
      })
    });

    // this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    //   console.log('Back press handler!');
    //   if (this._location.isCurrentPathEqualTo('tabs/home')) {

    //     // Show Exit Alert!
    //     console.log('Show Exit Alert!');
    //     this.showExitConfirm();
    //     processNextHandler();
    //   } else {

    //     // Navigate to back page
    //     console.log('Navigate to back page');
    //     this._location.back();

    //   }

    // });

    // this.platform.backButton.subscribeWithPriority(5, () => {
    //   console.log('Handler called to force close!');
    //   this.alertController.getTop().then(r => {
    //     if (r) {
    //       navigator['app'].exitApp();
    //     }
    //   }).catch(e => {
    //     console.log(e);
    //   })
    // });
  }

  
  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}
