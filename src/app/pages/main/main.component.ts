import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements AfterContentChecked {
  @ViewChild('swiper') swiper:SwiperComponent;
  config: SwiperOptions={
    slidesPerView: 2, 
    spaceBetween: 50, 
    pagination: true,
  };

  constructor() { }

  ngOnInit() {
   
  }
  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
      
    }
      
  }

  
  



  }
