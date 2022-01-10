import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import {canActivate} from '@angular/fire/auth-guard';
import { TabCampeonatoPage } from './tab-campeonato.page';
const isAdmin = (next:any ) => map( (user: any)=> !! user && 'LikZN15qNiQi1pFEAT8frapWt243' === user.uid);

const routes: Routes = [
  {
    path: '',
    component: TabCampeonatoPage,
    children: [
      {
        path: 'equipos',
        loadChildren: () => import('./../../pages/equipos/equipos.module').then( m => m.EquiposPageModule), 
        
      },
      {
        path: 'encuentros',
        loadChildren: () => import('./../../pages/encuentros/encuentros.module').then( m => m.EncuentrosPageModule),
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCampeonatoPageRoutingModule {}
