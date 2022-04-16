import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestCallPageRoutingModule } from './request-call-routing.module';

import { RequestCallPage } from './request-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestCallPageRoutingModule
  ],
  declarations: [RequestCallPage]
})
export class RequestCallPageModule {}
