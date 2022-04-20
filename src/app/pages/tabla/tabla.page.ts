import { Component, OnInit } from '@angular/core';
import { isThisSecond } from 'date-fns';
import { Subscription } from 'rxjs';
import { Equipos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Encuentro } from '../../models';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.page.html',
  styleUrls: ['./tabla.page.scss'],
})
export class TablaPage implements OnInit {

  grupo1: Equipos[] = [];
  grupo2: Equipos[] = [];
  equipob: Equipos[]=[];

  descenso:Equipos[]=[];
  equiposInfo1: Subscription;
  equiposInfo2: Subscription;
  opcion= "";
  posicion1=0;
  posicion2=0;
  estado=false;

  equiposelec: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0
  };

  constructor(public firestoreService: FirestoreService,) { 

   
  }

  ngOnInit() {
    this.opcion="clasificacion";
    this.getGrupo1();
    this.getGrupo2();
    this.getDescenso();
  }

  // getPosicionesEquipos(){
  //   this.grupo1.map( (value, index)=>{
  //     return console.log("Equipo",index +1);
  //   });
  // }
  // getPosicionesEquipos2(){
  //   this.grupo2.map( (value, index)=>{
  //     return console.log("Equipo",index +1);
  //   });
  // }


  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }
async getGrupo1(){
  const path= 'Equipos';
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo1').subscribe(res =>{
    this.grupo1=res;
    console.log(res);

  });
}

async getDescenso(){

  const path='Equipos';
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'Descenso').subscribe(res =>{
    this.descenso=res;
    console.log(res);

  });
}



async getGrupo2(){
  const path= 'Equipos';
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo2').subscribe(res =>{
    this.grupo2=res;
    console.log(res);

      });
}

}
