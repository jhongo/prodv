import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {  AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from '@angular/fire/storage';
import { HeaderComponent } from './componentes/header/header.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MainComponent } from './pages/main/main.component';
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { InternacionalComponent } from './pages/internacional/internacional.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EditEquipoComponent } from './pages/edit-equipo/edit-equipo.component';
import { EditPartidoComponent } from './pages/edit-partido/edit-partido.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
// import { SwiperModule } from 'swiper/angular';
import {HttpClientModule} from '@angular/common/http';
import { NewcampeonatoComponent } from './pages/newcampeonato/newcampeonato.component';
// import { SwiperComponentComponent } from './componentes/swiper-component/swiper-component.component';

import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobService } from './services/admob.service';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PerfilComponent,
    MainComponent,
    CampeonatosComponent,
    InternacionalComponent,
    NoticiasComponent, 
    EditEquipoComponent,
    EditPartidoComponent,
    RecuperarComponent,
    NewcampeonatoComponent,
    // SwiperComponentComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule, 
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [AdMobFree,AdmobService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
