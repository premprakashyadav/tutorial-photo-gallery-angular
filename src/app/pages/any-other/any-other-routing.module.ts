import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnyOtherPage } from './any-other.page';

const routes: Routes = [
  {
    path: '',
    component: AnyOtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnyOtherPageRoutingModule {}
