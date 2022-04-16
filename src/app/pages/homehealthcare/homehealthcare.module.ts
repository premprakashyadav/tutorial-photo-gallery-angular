import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomehealthcarePageRoutingModule } from './homehealthcare-routing.module';

import { HomehealthcarePage } from './homehealthcare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomehealthcarePageRoutingModule
  ],
  declarations: [HomehealthcarePage]
})
export class HomehealthcarePageModule {}
