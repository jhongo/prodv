import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageLocalPage } from './page-local.page';

const routes: Routes = [
  {
    path: '',
    component: PageLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLocalPageRoutingModule {}
