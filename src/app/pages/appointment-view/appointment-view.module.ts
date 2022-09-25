import { ReviewPage } from '../review/review.page';
import { AppointmentViewPage } from './appointment-view.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ReviewPageModule } from '../review/review.module';


const routes: Routes = [
  {
    path: '',
    component: AppointmentViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppointmentViewPage],
  entryComponents: []
})
export class AppointmentViewPageModule {}
