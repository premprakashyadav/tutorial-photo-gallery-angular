import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthBuddyPageRoutingModule } from './health-buddy-routing.module';

import { HealthBuddyPage } from './health-buddy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthBuddyPageRoutingModule
  ],
  declarations: [HealthBuddyPage]
})
export class HealthBuddyPageModule {}
