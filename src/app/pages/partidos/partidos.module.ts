import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidosPageRoutingModule } from './partidos-routing.module';

import { PartidosPage } from './partidos.page';
import { SwiperModule } from 'swiper/angular';
import { SwiperComponentComponent } from 'src/app/componentes/swiper-component/swiper-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    PartidosPageRoutingModule
  ],
  declarations: [PartidosPage,SwiperComponentComponent]
})
export class PartidosPageModule {}
