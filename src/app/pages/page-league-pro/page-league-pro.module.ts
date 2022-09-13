import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageLeagueProPageRoutingModule } from './page-league-pro-routing.module';

import { PageLeagueProPage } from './page-league-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLeagueProPageRoutingModule
  ],
  declarations: [PageLeagueProPage]
})
export class PageLeagueProPageModule {}
