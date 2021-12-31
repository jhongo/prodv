import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage, 
    children:[
      {
        path: 'partidos',
        loadChildren: () => import('./../../screens/partidos/partidos.module').then( m => m.PartidosPageModule)
      },
      {
        path: 'resultados',
        loadChildren: () => import('./../../screens/resultados/resultados.module').then( m => m.ResultadosPageModule)
      },
      {
        path: 'tabla',
        loadChildren: () => import('./../../screens/tabla/tabla.module').then( m => m.TablaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
