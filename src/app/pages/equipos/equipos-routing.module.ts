import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposPage } from './equipos.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposPageRoutingModule {}
