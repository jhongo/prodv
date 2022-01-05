import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuentrosPage } from './encuentros.page';

const routes: Routes = [
  {
    path: '',
    component: EncuentrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuentrosPageRoutingModule {}
