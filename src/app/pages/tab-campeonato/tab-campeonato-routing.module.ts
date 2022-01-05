import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCampeonatoPage } from './tab-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: TabCampeonatoPage,
    children: [
      {
        path: 'equipos',
        loadChildren: () => import('./../../pages/equipos/equipos.module').then( m => m.EquiposPageModule)
      },
      {
        path: 'encuentros',
        loadChildren: () => import('./../../pages/encuentros/encuentros.module').then( m => m.EncuentrosPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCampeonatoPageRoutingModule {}
