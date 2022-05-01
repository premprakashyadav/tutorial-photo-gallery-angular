import { Component, OnInit } from '@angular/core';
import { Checkout } from 'capacitor-razorpay';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-makeapayment',
  templateUrl: './makeapayment.page.html',
  styleUrls: ['./makeapayment.page.scss'],
})
export class MakeapaymentPage implements OnInit {
  email: any;
  rzp1: any;
  userDetails: any;
  currentImage = null;
  regData = { name: '', mobile: '', address: '', email: '', amount: null };
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    Storage.get({ key: 'USER_INFO' }).then(data => {
      if (data && data.value != null) {
        this.userDetails = JSON.parse(data.value);
        this.regData.name = this.userDetails.patient_firstname;
        this.regData.email = this.userDetails.patient_email;
        this.regData.mobile = this.userDetails.patient_contact;
      }
    }, error => {
      console.log(error);
    });
  }

  async payWithRazorpay() {
    let options;
    let geten: number = this.regData.amount * 100;
    if (this.regData.mobile.length < 10) {
      this.alert('Please Enter 10 Digit Mobile Number');
      return false;
    }
    else {
      options = {
        key: 'rzp_live_SbhTbvL3OJNrhK',
        amount: geten,
        description: 'Credits to surgician & iwantmedicine',
        image: 'http://www.surgician.com/wp-content/uploads/2022/01/surgician-logo.png',
        // order_id: 'order_Cp10EhSaf7wLbS',//Order ID generated in Step 1
        currency: 'INR',
        name: 'surgician.com',
        prefill: {
          contact: this.regData.mobile,
          name: this.regData.name,
          email: this.regData.email
        },
        theme: {
          color: '#3399cc'
        }
      };
      try {
        let data = (await Checkout.open(options));
        console.log(data.response + "surgician");

        this.presentAlert(data.response);
      } catch (error) {
        this.presentAlert(error.message); //Doesn't appear at all
      }
    }
  }

  async presentAlert(response: string) {
    // let responseObj = JSON.parse(response)
    console.log("message" + response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message: response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }

  async alert(message: string) {
    const alertVal = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alertVal.present();
  }

  sendEmail() {}

}
