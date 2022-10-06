import { Component, OnInit } from '@angular/core';
import { AdmobService } from 'src/app/services/admob.service';


@Component({
  selector: 'app-page-internacional',
  templateUrl: './page-internacional.page.html',
  styleUrls: ['./page-internacional.page.scss'],
})
export class PageInternacionalPage implements OnInit {

  constructor(private admobService: AdmobService,) {}

  ngOnInit() {
    this.admobService.mostrarBanner();
  }
  mostrarInterstitial(){
    this.admobService.mostrarInterstitial();
  }
  mostrarReward(){
    this.admobService.mostrarRewardVideo();
  }

}
