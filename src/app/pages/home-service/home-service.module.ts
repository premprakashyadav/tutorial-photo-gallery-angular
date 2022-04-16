import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeServicePageRoutingModule } from './home-service-routing.module';

import { HomeServicePage } from './home-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeServicePageRoutingModule
  ],
  declarations: [HomeServicePage]
})
export class HomeServicePageModule {}
