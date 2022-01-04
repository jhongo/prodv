import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from '@angular/fire/storage';
import { HeaderComponent } from './componentes/header/header.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MainComponent } from './pages/main/main.component';
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { InternacionalComponent } from './pages/internacional/internacional.component';
import { NacionalComponent } from './pages/nacional/nacional.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HeaderComponent,
    PerfilComponent,
    MainComponent,
    CampeonatosComponent,
    InternacionalComponent,
    NacionalComponent,
    NoticiasComponent, 

  ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
