import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestCallPage } from './request-call.page';

const routes: Routes = [
  {
    path: '',
    component: RequestCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestCallPageRoutingModule {}
