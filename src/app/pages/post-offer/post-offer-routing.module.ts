import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostOfferPage } from './post-offer.page';

const routes: Routes = [
  {
    path: '',
    component: PostOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostOfferPageRoutingModule {}
