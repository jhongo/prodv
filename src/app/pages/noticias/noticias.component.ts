import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  _category = 'sports';
  _language = 'es';
  _apiKey   = '154febca782d4153ab593e21a0a25248'; 
  news =[];
  

  constructor(
    private http: HttpClient,) { }

  ngOnInit() {
    
    this.http.get<any>('https://newsapi.org/v2/top-headlines',
    {
      params:{
        'category' : this._category,
        'language' : this._language, 
        'apiKey'   : this._apiKey,
      }
    }
    ).subscribe(resp =>{
      console.log(resp);
      this.news = resp.articles
      console.log(this.news);
    })


  }

}
