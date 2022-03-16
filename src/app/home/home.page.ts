import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Encuentro, EncuentroPrueba } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // equiposInfo: Subscription;
  // team: Encuentro[] = [];
  // cuartos: Encuentro []=[];
  // semi: Encuentro []=[];
  // final: Encuentro []=[];

  // cuarto=false;
  // semis=false;
  // fina=false;
  // fases=false;

  // encuentro: Encuentro = {
  //   uid: '',
  //   tipo: '',
  //   fechae: '',
  //   fecha: '',
  //   grupo: '',
  //   uid_e1: '',
  //   uid_e2: '',
  //   estado: 'iniciado',
  //   res_e1: 0,
  //   res_e2: 0,
  //   escudo_e1: '',
  //   escudo_e2: '',
  //   nombre_e1: '',
  //   nombre_e2: '',
  // }

  matches =[];
  _category = 'sports';
  _language = 'es';
  _apiKey   = '154febca782d4153ab593e21a0a25248'; 
  news =[];

  equiposInfo: Subscription;


  genef: EncuentroPrueba []=[];
  gene: EncuentroPrueba []=[];
  geneinit:EncuentroPrueba[]=[];
  grupo1 :EncuentroPrueba []=[];
  grupo2 :EncuentroPrueba []=[];
  grupoinit1:EncuentroPrueba[]=[];
  grupoinit2: EncuentroPrueba[]=[];
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

  opcion = "";
  opciong="";
  fase="";
  numero=0;

  constructor(public firestoreService: FirestoreService,
              public alertController: AlertController,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.getPartidos();
     this.opciong="Noticias";
     this.opcion="Copa_Gualaquiza";
    

    // API NOTICIAS DEPORTIVAS
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
    });

    //API RESULTADOS DEPORTIVOS
    this.http.get<any>('https://v3.football.api-sports.io/fixtures?live=all',{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      }
    }).subscribe(res =>{
      console.log(res);
      this.matches = res.response;
      console.log(res.response);
    });


  }
  

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  
  }

  segmentChange(event: any){
    const option = event.detail.value;
    console.log(option);
    this.opciong=option;
    if(this.opciong=="Partidos"){
      this.opcion="Copa_Gualaquiza";
    }else{
      this.opciong=option;
    }
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
         this.partidos_init(this.encuentro.tipo);
        }else{
        this.gene=[];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
       }


      
    });

  }

  async prueba(tipo:string){
    const path='Partidos';
    this.equiposInfo = this.firestoreService.getCollection<EncuentroPrueba>(path,'tipo','==', tipo).subscribe(res =>{
      
        this.gene = res;
        this.grupo1=[];
        this.grupo2=[];
        this.grupof1=[];
        this.grupof2=[];
        this.gru1=false;
        this.gru2=false;

      
  });
  }
  async partidos_init(tipo:string){  
    const path='Partidos';
    this.equiposInfo = this.firestoreService.getpartidos_init<EncuentroPrueba>(path,'tipo','==', tipo).subscribe(res =>{
        
        this.geneinit=res;
        this.grupo1=[];
        this.grupo2=[];
        this.grupof1=[];
        this.grupof2=[];
        this.gru1=false;
        this.gru2=false;
      
     
  });
    
  }
  async pruebafina(tipo:string){
    const path='Partidos';
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<EncuentroPrueba>(path,'tipo','==', tipo).subscribe(res =>{
      
        this.genef = res;
        this.grupo1=[];
        this.grupo2=[];
        this.grupof1=[];
        this.grupof2=[];
        this.gru1=false;
        this.gru2=false;
      
     
  });
  }
  

  async grupos(fase:string){
    const path='Partidos';
    
      this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 1',fase).subscribe(res=>{
        this.grupo1=res;
        if(res.length){
          this.gru1=true;
          this.gene=[];
          this.genef=[];
        }else{
          // this.gru1=false;
        }
      });

      this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 2', fase).subscribe(res=>{
        this.grupo2=res;
        if(res.length){
          this.gru2=true;
          this.gene=[];
          this.genef=[];
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

  async partidos_init_fases(fase:string){
    const path='Partidos';
    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 1',fase).subscribe(res=>{
      this.grupoinit1=res;
      if(res.length){
        this.gru1=true;
      }else{
        // this.gru1=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 2', fase).subscribe(res=>{
      this.grupoinit2=res;
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
      this.titulo="Fecha 1";
      this.grupos("Fecha 1");
      this.gruposfinalizados("Fecha 1");
      this.partidos_init_fases("Fecha 1");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==2){
      this.titulo="Fecha 2";
      this.grupos("Fecha 2");
      this.gruposfinalizados("Fecha 2");
      this.partidos_init_fases("Fecha 2");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==3){
      this.titulo="Fecha 3";
      this.grupos("Fecha 3");
      this.gruposfinalizados("Fecha 3");
      this.partidos_init_fases("Fecha 3");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==4){
      this.titulo="Fecha 4";
      this.grupos("Fecha 4");
      this.gruposfinalizados("Fecha 4");
      this.partidos_init_fases("Fecha 4");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==5){
      this.titulo="Fecha 5";
      this.grupos("Fecha 5");
      this.gruposfinalizados("Fecha 5");
      this.partidos_init_fases("Fecha 5");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==6){
      this.titulo="Fecha 6";
      this.grupos("Fecha 6");
      this.gruposfinalizados("Fecha 6");
      this.partidos_init_fases("Fecha 6");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==7){
      this.titulo="Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==8){
      this.titulo="Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==9){
      this.titulo="Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
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
      this.titulo="Fecha 1";
      this.grupos("Fecha 1");
      this.gruposfinalizados("Fecha 1");
      this.partidos_init_fases("Fecha 1");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==2){
      this.titulo="Fecha 2";
      this.grupos("Fecha 2");
      this.gruposfinalizados("Fecha 2");
      this.partidos_init_fases("Fecha 2");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==3){
      this.titulo="Fecha 3";
      this.grupos("Fecha 3");
      this.gruposfinalizados("Fecha 3");
      this.partidos_init_fases("Fecha 3");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==4){
      this.titulo="Fecha 4";
      this.grupos("Fecha 4");
      this.gruposfinalizados("Fecha 4");
      this.partidos_init_fases("Fecha 4");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==5){
      this.titulo="Fecha 5";
      this.grupos("Fecha 5");
      this.gruposfinalizados("Fecha 5");
      this.partidos_init_fases("Fecha 5");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==6){
      this.titulo="Fecha 6";
      this.grupos("Fecha 6");
      this.gruposfinalizados("Fecha 6");
      this.partidos_init_fases("Fecha 6");
      this.gene=[];
      this.genef=[];
      this.geneinit=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==7){
      this.titulo="Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==8){
      this.titulo="Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.gru2=false;
      this.gru1=false;
    }else if(this.numero==9){
      this.titulo="Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.grupoinit1=[];
      this.grupoinit2=[];
      this.grupo1=[];
      this.grupo2=[];
      this.grupof1=[];
      this.grupof2=[];
      this.gru2=false;
      this.gru1=false;
    }
  }



}
