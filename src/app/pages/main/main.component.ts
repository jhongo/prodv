import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  modes =[ 'C.Gualaquiza','Liga Pro','Internacional'];
  selectedMode = 'C.Gualaquiza';


  heroes = [
    
    {nombre:'SuperMan'}, 
    {nombre:'Batman'},
    {nombre:'Linterna Verde'},
    {nombre:'Wonder Woman'},
    {nombre:'Robin'}
  
  ]

   posiciones ={
     num: 0
   }

  constructor() { }

  ngOnInit() {
    this.getPosiciones();
  }
  

  getPosiciones(){
    this.heroes.map( (value, index) =>{
      this.posiciones.num = index+1
      return console.log(index +1, this.posiciones.num );
      
    });
  }
}
