import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabInicialPageRoutingModule } from './tab-inicial-routing.module';

import { TabInicialPage } from './tab-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabInicialPageRoutingModule
  ],
  declarations: [TabInicialPage]
})
export class TabInicialPageModule {}
