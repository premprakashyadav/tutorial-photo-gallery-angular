import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnyOtherPageRoutingModule } from './any-other-routing.module';

import { AnyOtherPage } from './any-other.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnyOtherPageRoutingModule
  ],
  declarations: [AnyOtherPage]
})
export class AnyOtherPageModule {}
