import { Component, OnInit } from '@angular/core';
import { isThisSecond } from 'date-fns';
import { Subscription } from 'rxjs';
import { Equipos, Campeonatos } from 'src/app/models';
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
  descenso:Equipos[]=[];
  equiposInfo1: Subscription;
  equipoInfo: Subscription;
  equiposInfo2: Subscription;
  opcion= "";

  gru1= false;
  gru2= false;
  des=false;

  
  
  campeonatos: Campeonatos[] = [];
  infocampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
    fases: 0
  };

  constructor(public firestoreService: FirestoreService,) { 

   
  }

  ngOnInit() {
    // this.infocampeonato.uid="3BuPLlNAQ7yA4yo8Karg";
    // this.infocampeonato.nombre="Copa Gualaquiza";
    const campeonatod = this.firestoreService.getCampeonato();
    console.log(campeonatod);
    if (campeonatod == undefined) {
      this.infocampeonato.uid="3BuPLlNAQ7yA4yo8Karg";
      this.infocampeonato.nombre="Copa Gualaquiza";
    }else{
      this.infocampeonato = campeonatod;      
    }
    this.opcion="clasificacion";
    this.getGrupo1(this.infocampeonato.uid);
    this.getGrupo2(this.infocampeonato.uid);
    this.getDescenso(this.infocampeonato.uid);
    this.getCampeonatos();
  }

  async getCampeonato(campeonato: Campeonatos) {
    console.log('Click en getEquipo');
    console.log(campeonato);
    this.firestoreService.setCampeonato(campeonato);

    const campeonatod = this.firestoreService.getCampeonato();
    if (campeonatod !== undefined) {
      this.infocampeonato = campeonatod;
    }
    console.log(this.infocampeonato);
    this.getGrupo1(this.infocampeonato.uid);
    this.getGrupo2(this.infocampeonato.uid);
    this.getDescenso(this.infocampeonato.uid);
    // this.getPartidos(this.infocampeonato.uid);

  }

  getCampeonatos() {
    const path = 'Campeonatos';
    this.equipoInfo = this.firestoreService.getTeam<Campeonatos>(path).subscribe(res => {
      this.campeonatos = res;
    });

  }

  segment(event: any) {
    const option = event.detail.value;
    console.log(option);
    // this.opciong = option;
    
     this.limpiar();
    
  }

  async limpiar (){

    this.grupo1=[];
    this.grupo2=[];
    this.descenso=[];
    this.gru1=false;
    this.gru2=false,
    this.des=false;



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
async getGrupo1(uid:string){
  const path = 'Campeonatos/'+uid+'/Equipos'; 
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo1').subscribe(res =>{
    this.grupo1=res;
    console.log(res);
    if(res.length){
      this.gru1=true;
    }

  });
}

async getDescenso(uid:string){

  const path = 'Campeonatos/'+uid+'/Equipos'; 
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'Descenso').subscribe(res =>{
    this.descenso=res;
    console.log(res);
    if(res.length){
      this.des=true;
    }

  });
}



async getGrupo2(uid:string){
  const path = 'Campeonatos/'+uid+'/Equipos'; 
  this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo2').subscribe(res =>{
    this.grupo2=res;
    console.log(res);
    if(res.length){
      this.gru2=true;
    }

      });
}

}
