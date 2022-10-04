import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { TabNewcampeonatoPage } from './tab-newcampeonato.page';
const isAdmin = (next: any ) => map( (user: any)=> !! user && 'LikZN15qNiQi1pFEAT8frapWt243' === user.uid);

const routes: Routes = [
  {
    path: '',
    component: TabNewcampeonatoPage,
    children: [
      {
        path: 'equipos1',
        loadChildren: () => import('./../../pages/equipos1/equipos1.module').then( m => m.Equipos1PageModule),
      },
      {
        path: 'encuentros1',
        loadChildren: () => import('./../../pages/encuentros1/encuentros1.module').then( m => m.Encuentros1PageModule),
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNewcampeonatoPageRoutingModule {}
