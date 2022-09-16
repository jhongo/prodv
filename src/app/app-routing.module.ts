import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MainComponent } from './pages/main/main.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NacionalComponent } from './pages/nacional/nacional.component';
import { InternacionalComponent } from './pages/internacional/internacional.component';
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { map } from 'rxjs/operators';
import {canActivate} from '@angular/fire/auth-guard'; 
import { EditEquipoComponent } from './pages/edit-equipo/edit-equipo.component';
import { EditPartidoComponent } from './pages/edit-partido/edit-partido.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { NewcampeonatoComponent } from './pages/newcampeonato/newcampeonato.component';

const isAdmin = (next:any ) => map( (user: any)=> !! user && 'LikZN15qNiQi1pFEAT8frapWt243' === user.uid);
const isAdminS = (next:any ) => map( (user: any)=> !! user && 'LikZN15qNiQi1pFEAT8frapWt243' === user.uid);


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    component:RegistroComponent
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  // {
  //   path:'',
  //   redirectTo:'login',
  //   pathMatch:'full',
  // },
  {
    path: 'main',
    component:MainComponent,
  },
  {
    path: '',
    redirectTo:'main',
    pathMatch:'full',
  },
  {
    path: 'perfil',
    component:PerfilComponent,
  },
  {
    path: 'noticias',
    component:NoticiasComponent,
  },
  {
    path: 'nacional',
    component:NacionalComponent,
  },
  {
    path: 'internacional',
    component:InternacionalComponent,
  },
  {
    path: 'campeonatos',
    component:CampeonatosComponent,
  },
  {
    path: 'edit-equipo',
    component:EditEquipoComponent,
  },
  {
    path: 'edit-partido',
    component: EditPartidoComponent,
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
  },{

    path: 'newcampeonato',
    component: NewcampeonatoComponent,
  },

  {
    path: 'tab-inicial',
    loadChildren: () => import('./pages/tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  },
  {
    path: 'tab-campeonato',
    loadChildren: () => import('./pages/tab-campeonato/tab-campeonato.module').then( m => m.TabCampeonatoPageModule),
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'encuentros1',
    loadChildren: () => import('./pages/encuentros1/encuentros1.module').then( m => m.Encuentros1PageModule)
  },
  {
    path: 'equipos1',
    loadChildren: () => import('./pages/equipos1/equipos1.module').then( m => m.Equipos1PageModule)
  },
  {
    path: 'tab-newcampeonato',
    loadChildren: () => import('./pages/tab-newcampeonato/tab-newcampeonato.module').then( m => m.TabNewcampeonatoPageModule)
  },
  {
      path: 'partidos',
      loadChildren: () => import('./pages/partidos/partidos.module').then( m => m.PartidosPageModule)
    },
  {
    path: 'page-main-menu',
    loadChildren: () => import('./pages/page-main-menu/page-main-menu.module').then( m => m.PageMainMenuPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
