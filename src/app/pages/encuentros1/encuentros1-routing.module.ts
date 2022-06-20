import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Encuentros1Page } from './encuentros1.page';

const routes: Routes = [
  {
    path: '',
    component: Encuentros1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Encuentros1PageRoutingModule {}
