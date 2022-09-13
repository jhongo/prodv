import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageLocalPageRoutingModule } from './page-local-routing.module';

import { PageLocalPage } from './page-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLocalPageRoutingModule
  ],
  declarations: [PageLocalPage]
})
export class PageLocalPageModule {}
