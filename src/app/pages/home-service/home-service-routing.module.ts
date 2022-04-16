import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeServicePage } from './home-service.page';

const routes: Routes = [
  {
    path: '',
    component: HomeServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeServicePageRoutingModule {}
