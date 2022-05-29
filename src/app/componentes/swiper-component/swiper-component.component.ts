import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-swiper-component',
  template: `<swiper
  [spaceBetween]="30"
  class="mySwiper"
  [autoplay]="{
    delay: 5000,
    disableOnInteraction: false
  }"
>
  <ng-template swiperSlide><img src="https://res.cloudinary.com/dnsjl4fpd/image/upload/v1653787488/prodv-publi/Papeleria_punto_net_Auspiciante_hnpac8.png"/></ng-template>
  <ng-template swiperSlide><img src="https://res.cloudinary.com/dnsjl4fpd/image/upload/v1653787481/prodv-publi/Gilberto_Brito_Auspiciante_hzh9fy.png"/></ng-template>
  <ng-template swiperSlide><img src="https://res.cloudinary.com/dnsjl4fpd/image/upload/v1653787474/prodv-publi/Comercial_Vimar_kanz2m.png"/></ng-template>
  <ng-template swiperSlide><img src="https://res.cloudinary.com/dnsjl4fpd/image/upload/v1653787466/prodv-publi/Avias_fr8xec.png"/></ng-template>
  <ng-template swiperSlide><img src="https://res.cloudinary.com/dnsjl4fpd/image/upload/v1653787462/prodv-publi/Aguardiente_el_Masharito_thygkq.png"/></ng-template>

</swiper>`,

  // templateUrl: './swiper-component.component.html',
  styleUrls: ['./swiper-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
