import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-main-menu',
  templateUrl: './page-main-menu.page.html',
  styleUrls: ['./page-main-menu.page.scss'],
})
export class PageMainMenuPage implements OnInit {


  optionMenu="";

  constructor() { }

  ngOnInit() {
    this.optionMenu="local";
  }

  changeSegment( event: any ){ 
    // const opc = event.;
    // this.opcion =opc;
    console.log(event); 

  } 

}
