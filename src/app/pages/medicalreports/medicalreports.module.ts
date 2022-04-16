import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalreportsPageRoutingModule } from './medicalreports-routing.module';

import { MedicalreportsPage } from './medicalreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalreportsPageRoutingModule
  ],
  declarations: [MedicalreportsPage]
})
export class MedicalreportsPageModule {}
