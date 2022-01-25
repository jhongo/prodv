import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  modes =[ 'Superheroes','Villanos','Otros',];
  selectedMode = 'Superheroes';


  heroes = ['Superman','Spiderman','Batman','Linterna Verde', 'Robin'];

  constructor() { }

  ngOnInit() {
    this.getPosiciones();
  }

  
  


  getPosiciones(){
    this.heroes.map( (value, index) =>{
      return console.log(index +1 );
  });


  }
}
