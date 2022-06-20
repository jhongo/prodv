import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Equipos1PageRoutingModule } from './equipos1-routing.module';

import { Equipos1Page } from './equipos1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Equipos1PageRoutingModule
  ],
  declarations: [Equipos1Page]
})
export class Equipos1PageModule {}
