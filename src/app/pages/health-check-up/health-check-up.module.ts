import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthCheckUpPageRoutingModule } from './health-check-up-routing.module';

import { HealthCheckUpPage } from './health-check-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthCheckUpPageRoutingModule
  ],
  declarations: [HealthCheckUpPage]
})
export class HealthCheckUpPageModule {}
