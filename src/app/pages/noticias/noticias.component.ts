import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  _category = 'sport';
  _language = 'es';
  _apiKey   = 'hJ1gCvor21cSinUM0fLcXXNY08m0KKfubvkh3pI3tdE'; 
  news =[];
  

  constructor(
    private http: HttpClient,) { }

  ngOnInit() {
    
    this.http.get<any>('https://api.newscatcherapi.com/v2/latest_headlines',
    { 
      headers:{
        'x-api-key' : this._apiKey,
      },

      params:{
        'topic' : this._category,
        'lang' : this._language, 
      }
    }
    ).subscribe(resp =>{
      console.log(resp);
      this.news = resp.articles
      console.log(this.news);
    })


  }

}
