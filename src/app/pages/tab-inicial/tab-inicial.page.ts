import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage implements OnInit {

  
  opcion= "";
  constructor() { }

  ngOnInit() {
    this.opcion="partidos"
  }

  changeSegment( event: any ){ 
    // const opc = event.;
    // this.opcion =opc;
    console.log(event); 

  } 
}
