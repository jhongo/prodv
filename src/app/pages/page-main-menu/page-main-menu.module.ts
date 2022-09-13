import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageMainMenuPageRoutingModule } from './page-main-menu-routing.module';

import { PageMainMenuPage } from './page-main-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageMainMenuPageRoutingModule
  ],
  declarations: [PageMainMenuPage]
})
export class PageMainMenuPageModule {}
