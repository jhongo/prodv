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
  opcion= "";
  posicion1=0;
  posicion2=0;
  estado=false;
  constructor(public firestoreService: FirestoreService,) { 

    this.getGrupo1();
    this.getGrupo2();
  }

  ngOnInit() {
    this.opcion="clasificacion";
    this.getGrupo1();
    this.getGrupo2();
  }

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }
async getGrupo1(){
  const path= 'Equipos';
  this.equiposInfo1 = this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo1').subscribe(res =>{
    
    this.grupo1=res;
    console.log(res);
  });
}

async getGrupo2(){
  const path= 'Equipos';
  this.equiposInfo2 = this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo2').subscribe(res =>{
    this.grupo2=res;
    
      });
}
}
