import { Component, OnInit } from '@angular/core';
import { isThisSecond } from 'date-fns';
import { Subscription } from 'rxjs';
import { Equipos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.page.html',
  styleUrls: ['./tabla.page.scss'],
})
export class TablaPage implements OnInit {
  grupo1: Equipos[] = [];
  grupo2: Equipos[] = [];
  equiposInfo1: Subscription;
  equiposInfo2: Subscription;
  
  posicion1=0;
  posicion2=0;
  constructor(public firestoreService: FirestoreService,) { 

    this.getGrupo1();
    this.getGrupo2();
  }

  ngOnInit() {
    this.getGrupo1();
    this.getGrupo2();
  }


async getGrupo1(){
  const path= 'Equipos';
  this.equiposInfo1 = this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo1').subscribe(res =>{
    
    this.grupo1=res;
    
  });
}

async getGrupo2(){
  const path= 'Equipos';
  this.equiposInfo2 = this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo2').subscribe(res =>{
    this.grupo2=res;
    
      });
}
}
