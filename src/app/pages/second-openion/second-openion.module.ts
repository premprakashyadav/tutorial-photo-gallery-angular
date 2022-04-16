import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondOpenionPageRoutingModule } from './second-openion-routing.module';

import { SecondOpenionPage } from './second-openion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondOpenionPageRoutingModule
  ],
  declarations: [SecondOpenionPage]
})
export class SecondOpenionPageModule {}
