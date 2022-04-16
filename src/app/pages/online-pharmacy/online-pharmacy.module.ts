import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinePharmacyPageRoutingModule } from './online-pharmacy-routing.module';

import { OnlinePharmacyPage } from './online-pharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinePharmacyPageRoutingModule
  ],
  declarations: [OnlinePharmacyPage]
})
export class OnlinePharmacyPageModule {}
