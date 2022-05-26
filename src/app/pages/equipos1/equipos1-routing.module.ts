import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Equipos1Page } from './equipos1.page';

const routes: Routes = [
  {
    path: '',
    component: Equipos1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Equipos1PageRoutingModule {}
