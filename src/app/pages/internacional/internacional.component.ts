import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-internacional',
  templateUrl: './internacional.component.html',
  styleUrls: ['./internacional.component.scss'],
})
export class InternacionalComponent implements OnInit {

  matches =[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('https://v3.football.api-sports.io/fixtures?live=all',{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      }
    }).subscribe(res =>{
      console.log(res);
      this.matches = res.response;
      console.log(res.response);
    })
  }

}
