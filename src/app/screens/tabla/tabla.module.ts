import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaPageRoutingModule } from './tabla-routing.module';

import { TablaPage } from './tabla.page';
import { HeaderComponent } from 'src/app/componentes/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    TablaPageRoutingModule
  ],
  declarations: [TablaPage]
})
export class TablaPageModule {}
