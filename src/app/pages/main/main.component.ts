import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  modes =[ 'moth 1','moth 2','moth 3','moth 4','moth 5','moth 6','moth 7','moth 8','moth 9', ];
  selectedMode = 'moth 1';

  heroes = ['SuperMan', 'Batman', 'Linterna Verde','Wonder Woman']

  constructor() { }

  ngOnInit() {}

}
