import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Encuentros1PageRoutingModule } from './encuentros1-routing.module';

import { Encuentros1Page } from './encuentros1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Encuentros1PageRoutingModule
  ],
  declarations: [Encuentros1Page]
})
export class Encuentros1PageModule {}
