import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageLeagueProPage } from './page-league-pro.page';

const routes: Routes = [
  {
    path: '',
    component: PageLeagueProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLeagueProPageRoutingModule {}
