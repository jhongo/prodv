import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-league-pro',
  templateUrl: './page-league-pro.page.html',
  styleUrls: ['./page-league-pro.page.scss'],
})
export class PageLeagueProPage implements OnInit {

  campeonatosEcuatorianos=[];
  nextMatch=[];
  positionsGroup = [];
  filterMatch=[];
  numberDate="";
  opcion="";

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.opcion = "Partidos";
    this.numberDate="12";

    //Get Type of Campeonato
    //  this.http.get<any>('https://api.b365api.com/v1/league',{
    //    params:{
    //      'sport_id' : '1',
    //      'cc' : 'ec', 
    //      'token': '135086-6tOga3UOkyFKVZ'
    //    }
    //  }).subscribe( res =>{
    //  console.log(res);
    //  this.campeonatosEcuatorianos = res.results;
    //  console.log(this.campeonatosEcuatorianos);

    //  });



    // Get Table Positions

    // this.http.get<any>('https://api.b365api.com/v2/league/table',{
    //   params:{
    //     'league_id' : '540',
    //     'token': '135086-6tOga3UOkyFKVZ'
    //   }
    // }).subscribe( res =>{
    //   console.log(res);
    //   this.positionsGroup = res.results;
    //   console.log(this.positionsGroup);

    // });

        this.http.get<any>('https://api.b365api.com/v3/events/upcoming',{
      params:{
        'league_id' : '540',
        'token': '135086-6tOga3UOkyFKVZ',
        'sport_id': '1'
      }
    }).subscribe( res =>{
      console.log(res);
      // this.filterMatch = res.results;
      // this.filterMatch.filter( match{
      //   return match.round == 12;
      // });
      this.nextMatch = res.results;
      // this.nextMatch.map( round => round == "12");
      this.filterMatch = this.nextMatch.filter( results => results.round == this.numberDate);


      console.log( this.nextMatch);
      console.log(this.filterMatch);

    });


  }

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion = opc;
  }
  handleChange(event: any){
    const getDate = event.target.value;
    this.numberDate = getDate;
    console.log(getDate);
  }

}
