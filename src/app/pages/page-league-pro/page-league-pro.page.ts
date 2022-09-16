import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-league-pro',
  templateUrl: './page-league-pro.page.html',
  styleUrls: ['./page-league-pro.page.scss'],
})
export class PageLeagueProPage implements OnInit {

  campeonatosEcuatorianos=[];

  positionsGroup = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.http.get<any>('https://api.b365api.com/v1/league',{
      params:{
        'sport_id' : '1',
        'cc' : 'ec', 
        'token': '135086-6tOga3UOkyFKVZ'
      }
    }).subscribe( res =>{
      // console.log(res);
      // this.campeonatosEcuatorianos = res.results;
      // console.log(this.campeonatosEcuatorianos);

    });



    // Get Table Positions

    this.http.get<any>('https://api.b365api.com/v2/league/table',{
      params:{
        'league_id' : '540',
        'token': '135086-6tOga3UOkyFKVZ'
      }
    }).subscribe( res =>{
      console.log(res);
      this.positionsGroup = res.results;
      console.log(this.positionsGroup);

    });

  }

}
