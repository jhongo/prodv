import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageInternacionalPageRoutingModule } from './page-internacional-routing.module';

import { PageInternacionalPage } from './page-internacional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageInternacionalPageRoutingModule
  ],
  declarations: [PageInternacionalPage]
})
export class PageInternacionalPageModule {}
