import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageInternacionalPage } from './page-internacional.page';

const routes: Routes = [
  {
    path: '',
    component: PageInternacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageInternacionalPageRoutingModule {}
