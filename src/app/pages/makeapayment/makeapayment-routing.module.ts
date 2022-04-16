import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeapaymentPage } from './makeapayment.page';

const routes: Routes = [
  {
    path: '',
    component: MakeapaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeapaymentPageRoutingModule {}
