import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuentrosPageRoutingModule } from './encuentros-routing.module';

import { EncuentrosPage } from './encuentros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuentrosPageRoutingModule
  ],
  declarations: [EncuentrosPage]
})
export class EncuentrosPageModule {}
