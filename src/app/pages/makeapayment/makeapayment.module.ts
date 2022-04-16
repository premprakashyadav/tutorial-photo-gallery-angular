import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeapaymentPageRoutingModule } from './makeapayment-routing.module';

import { MakeapaymentPage } from './makeapayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeapaymentPageRoutingModule
  ],
  declarations: [MakeapaymentPage]
})
export class MakeapaymentPageModule {}
