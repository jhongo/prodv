import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatRelativeWithOptions, getWeekYearWithOptions } from 'date-fns/fp';
import { Subscription } from 'rxjs';
import { Encuentro } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { EncuentroPrueba } from '../../models';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  equiposInfo: Subscription;
  team: Encuentro[] = [];
  cuartos: Encuentro []=[];
  semi: Encuentro []=[];
  final: Encuentro []=[];

  genef: EncuentroPrueba []=[];
 
  gene: EncuentroPrueba []=[];
  grupo1 :EncuentroPrueba []=[];
  grupo2 :EncuentroPrueba []=[];
  grupof1 :EncuentroPrueba []=[];
  grupof2 :EncuentroPrueba []=[];


  cuarto=false;
  semis=false;
  fina=false;
  fases=false;

  titulo="";
  gru1=false;
  gru2=false;

  encuentro: EncuentroPrueba = {
    uid: '',
    tipo: '',
    fechae: '',
    numero: 0,
    fecha: null,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'iniciado',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
  }


  fase="";
  numero=0;
  constructor(public firestoreService: FirestoreService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getPartidos();
 
  }

  async Fecha() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Fecha de partidos',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 1',
          value: 'Fecha 1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 2',
          value: 'Fecha 2'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 3',
          value: 'Fecha 3'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 4',
          value: 'Fecha 4'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 5',
          value: 'Fecha 5'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Fecha 1') {
              this.getPartido("Fecha 1");
              this.fase="Fecha 1";
            }
            if (data === 'Fecha 2') {
              this.getPartido("Fecha 2");
              this.fase="Fecha 2";
            }
            if (data === 'Fecha 3') {
              this.getPartido("Fecha 3"); 
              this.fase="Fecha 3";
            }
            if (data === 'Fecha 4') {
              this.getPartido("Fecha 4");
              this.fase="Fecha 4";
            }
            if (data === 'Fecha 5') {
              this.getPartido("Fecha 5");
              this.fase="Fecha 5";
            } 

          }
        }
      ]
    });
    await alert.present();
  }
  
  async getPartidos() {
    const path = 'Partidos';
    this.equiposInfo = this.firestoreService.getPartidos<EncuentroPrueba>(path).subscribe(res => {
      
      this.encuentro=res[0];
      if(this.encuentro.fechae==""){
      this.titulo=this.encuentro.tipo;
      }else{
        this.titulo=this.encuentro.fechae;
      }
       this.numero=this.encuentro.numero;
       this.fase = this.encuentro.fechae;

       if(this.fase==""){
         this.prueba(this.encuentro.tipo);
         this.pruebafina(this.encuentro.tipo);
        }else{
        this.gene=[];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
       }


      
    });

  }

  async prueba(tipo:string){
    const path='Partidos';
    this.equiposInfo = this.firestoreService.getCollection<EncuentroPrueba>(path,'tipo','==', tipo).subscribe(res =>{
      this.gene = res;
  });
  }
  async pruebafina(tipo:string){
    const path='Partidos';
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<EncuentroPrueba>(path,'tipo','==', tipo).subscribe(res =>{
      this.genef = res;
  });
  }

  async grupos(fase:string){
    const path='Partidos';
    
      this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 1',fase).subscribe(res=>{
        this.grupo1=res;
        if(res.length){
          this.gru1=true;
        }else{
          // this.gru1=false;
        }
      });

      this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 2', fase).subscribe(res=>{
        this.grupo2=res;
        if(res.length){
          this.gru2=true;
        }else{
          // this.gru2=false;
        }
      });

  

  }
  async gruposfinalizados(fase:string){
    const path='Partidos';
    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 1',fase).subscribe(res=>{
      this.grupof1=res;
      if(res.length){
        this.gru1=true;
      }else{
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 2', fase).subscribe(res=>{
      this.grupof2=res;
      if(res.length){
        this.gru2=true;
      }else{
        // this.gru2=false;
      }
    });


  }

  
async anterior(){

  if(this.numero>1){

    this.numero=this.numero-1;

  }
  
  console.log(this.numero)
  if(this.numero==1){
    this.grupos("Fecha 1");
    this.gruposfinalizados("Fecha 1");
    this.titulo="Fecha 1";
    this.gene=[];
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==2){
    this.titulo="Fecha 2";
    this.gruposfinalizados("Fecha 2");
    this.gene=[];
    this.grupos("Fecha 2");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==3){
    this.titulo="Fecha 3";
    this.gruposfinalizados("Fecha 3");
    this.gene=[];
    this.grupos("Fecha 3");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==4){
    this.titulo="Fecha 4";
    this.gruposfinalizados("Fecha 4");
    this.gene=[];
    this.grupos("Fecha 4");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==5){
    this.titulo="Fecha 5";
    this.gruposfinalizados("Fecha 5");
    this.gene=[];
    this.grupos("Fecha 5");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==6){
    this.titulo="Fecha 6";
    this.gruposfinalizados("Fecha 6");
    this.gene=[];
    this.grupos("Fecha 6");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==7){
    this.prueba("Cuartos de final");
    this.titulo="Cuartos de final"
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==8){
    this.prueba("Semifinal");
    this.titulo="Semifinal";
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==9){
    this.prueba("Final");
    this.titulo="Final";
    this.gru2=false;
    this.gru1=false;
  }
}

async siguiente(){
  if(this.numero<9){

    this.numero=this.numero+1;

  }
  
  console.log(this.numero)
  if(this.numero==1){
    this.grupos("Fecha 1");
    this.gruposfinalizados("Fecha 1");
    this.titulo="Fecha 1";
    this.gene=[];
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==2){
    this.titulo="Fecha 2";
    this.gruposfinalizados("Fecha 2");
    this.gene=[];
    this.grupos("Fecha 2");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==3){
    this.titulo="Fecha 3";
    this.gruposfinalizados("Fecha 3");
    this.gene=[];
    this.grupos("Fecha 3");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==4){
    this.titulo="Fecha 4";
    this.gruposfinalizados("Fecha 4");
    this.gene=[];
    this.grupos("Fecha 4");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==5){
    this.titulo="Fecha 5";
    this.gruposfinalizados("Fecha 5");
    this.gene=[];
    this.grupos("Fecha 5");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==6){
    this.titulo="Fecha 6";
    this.gruposfinalizados("Fecha 6");
    this.gene=[];
    this.grupos("Fecha 6");
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==7){
    this.prueba("Cuartos de final");
    this.titulo="Cuartos de final"
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==8){
    this.prueba("Semifinal");
    this.titulo="Semifinal";
    this.gru2=false;
    this.gru1=false;
  }else if(this.numero==9){
    this.prueba("Final");
    this.titulo="Final";
    this.gru2=false;
    this.gru1=false;
  }
}

  async getPartCuar(){
    const path= 'Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path,'tipo','==', 'Cuartos de final').subscribe(res =>{
      this.cuartos=res;
      if(res.length==0){
        console.log("vacio");
        this.cuarto=false;
      }else{
        this.cuarto=true;
      }
      
    });
  }
  async getPartsemi(){
    const path= 'Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path,'tipo','==', 'Semifinal').subscribe(res =>{
      
      this.semis=true;
      if(res.length==0){
        this.semis=false;
      }else{
        this.semi=res;
        
      }
    });
  }
  async getPartfinal(){
    const path= 'Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path,'tipo','==', 'Final').subscribe(res =>{
      this.final=res;
      if(res.length==0){
         this.fina=false;
      }else{
        this.fina=true;
      }


    });
  }


  async getPartido(fase:string){
    const path= 'Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path,'fechae','==',fase).subscribe(res =>{
      this.team=res;
      if(res.length==0){
        // this.fases=false;
      }else{
        this.fases=true;

      }
    });
  }
}
