import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabNewcampeonatoPageRoutingModule } from './tab-newcampeonato-routing.module';

import { TabNewcampeonatoPage } from './tab-newcampeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabNewcampeonatoPageRoutingModule
  ],
  declarations: [TabNewcampeonatoPage]
})
export class TabNewcampeonatoPageModule {}
