import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsId: string;
  details;
  opcion="";
  constructor(
    private activateddRouter: ActivatedRoute, 
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.opcion="detalles";
    this.detailsId = this.activateddRouter.snapshot.paramMap.get('id');
    this.http.get<any>('https://v3.football.api-sports.io/fixtures',{
        headers:{
          'x-rapidapi-host' : 'v3.football.api-sports.io',
          'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
        },
        params:{
          'id' : this.detailsId
        }
    }).subscribe(resp =>{
      console.log(resp);
      this.details = resp.response
    })
  
  }

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }

}
