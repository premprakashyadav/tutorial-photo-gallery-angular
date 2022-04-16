import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostOfferPageRoutingModule } from './post-offer-routing.module';

import { PostOfferPage } from './post-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostOfferPageRoutingModule
  ],
  declarations: [PostOfferPage]
})
export class PostOfferPageModule {}
