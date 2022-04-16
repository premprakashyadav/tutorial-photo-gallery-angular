import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthCheckUpPage } from './health-check-up.page';

const routes: Routes = [
  {
    path: '',
    component: HealthCheckUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthCheckUpPageRoutingModule {}
