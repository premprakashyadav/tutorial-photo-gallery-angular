import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthBuddyPage } from './health-buddy.page';

const routes: Routes = [
  {
    path: '',
    component: HealthBuddyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthBuddyPageRoutingModule {}
