import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageMainMenuPage } from './page-main-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PageMainMenuPage,
    children:[
      {
        path: 'local',
        loadChildren: () => import('./../../pages/page-local/page-local.module').then( m => m.PageLocalPageModule)
      },
      {
        path: 'liga-pro',
        loadChildren: () => import('./../../pages/page-league-pro/page-league-pro.module').then( m => m.PageLeagueProPageModule)
      },
      {
        path: 'internacional',
        loadChildren: () => import('./../../pages/page-internacional/page-internacional.module').then( m => m.PageInternacionalPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../../pages/page-profile/page-profile.module').then( m => m.PageProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageMainMenuPageRoutingModule {}
