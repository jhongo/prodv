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

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'register',   
    component:RegistroComponent
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'main',
    component:MainComponent,
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
  // {
  //   path:'',
  //   component: LoginComponent,
  //   pathMatch:'full',
  // },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path: 'tab-inicial',
    loadChildren: () => import('./pages/tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  },



  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
