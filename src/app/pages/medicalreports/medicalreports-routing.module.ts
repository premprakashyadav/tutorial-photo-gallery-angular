import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalreportsPage } from './medicalreports.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalreportsPageRoutingModule {}
