import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondOpenionPage } from './second-openion.page';

const routes: Routes = [
  {
    path: '',
    component: SecondOpenionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondOpenionPageRoutingModule {}
