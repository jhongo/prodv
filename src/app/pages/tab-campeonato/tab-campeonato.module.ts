import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCampeonatoPageRoutingModule } from './tab-campeonato-routing.module';

import { TabCampeonatoPage } from './tab-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCampeonatoPageRoutingModule
  ],
  declarations: [TabCampeonatoPage]
})
export class TabCampeonatoPageModule {}
