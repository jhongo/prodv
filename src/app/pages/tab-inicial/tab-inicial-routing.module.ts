import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    
    component: TabInicialPage, 
    children: [
      {
        path: 'tabla',
        loadChildren: () => import('./../../pages/tabla/tabla.module').then( m => m.TablaPageModule)
      },
      {
        path: 'partidos',
        loadChildren: () => import('./../../pages/partidos/partidos.module').then( m => m.PartidosPageModule)
      },
      {
        path: 'resultados',
        loadChildren: () => import('./../../pages/resultados/resultados.module').then( m => m.ResultadosPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
