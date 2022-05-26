import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatRelativeWithOptions, getWeekYearWithOptions } from 'date-fns/fp';
import { Subscription } from 'rxjs';
import { Encuentro, Campeonatos, Equipos } from 'src/app/models';
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
  equipoInfo: Subscription;

  genef: EncuentroPrueba []=[];
  gene: EncuentroPrueba []=[];
  geneinit:EncuentroPrueba[]=[];
  grupo1 :EncuentroPrueba []=[];
  grupo2 :EncuentroPrueba []=[];
  grupoinit1:EncuentroPrueba[]=[];
  grupoinit2: EncuentroPrueba[]=[];
  grupof1 :EncuentroPrueba []=[];
  grupof2 :EncuentroPrueba []=[];
  geneida: EncuentroPrueba[] = [];
  geneidainit: EncuentroPrueba[] = [];
  geneidaf: EncuentroPrueba[] = [];
  genevuel: EncuentroPrueba[] = [];
  genevuelinit: EncuentroPrueba[] = [];
  genevuelf: EncuentroPrueba[] = [];
  


  cuarto=false;
  semis=false;
  fina=false;
  fases=false;
  ida = false;
  vuelta = false;
  descenso = false;
  opcion= "";
  opcion2= "";
  titulo="";
  gru1=false;
  gru2=false;

  campeonatos: Campeonatos[] = [];
  infocampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
  };
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



// Tabla

grupoE1: Equipos[] = [];
grupoE2: Equipos[] = [];
descensoE:Equipos[]=[];


grup1= false;
grup2= false;
des=false;


  constructor(public firestoreService: FirestoreService,
              public alertController: AlertController) { 
                

              }

  ngOnInit() {  
    this.opcion="Partidos";
    this.opcion2="Clasificacion";

    const campeonatod = this.firestoreService.getCampeonato();
    console.log(campeonatod);
    if (campeonatod == undefined) {
      this.infocampeonato.uid="3BuPLlNAQ7yA4yo8Karg";
      this.infocampeonato.nombre="Copa Gualaquiza";
    }else{
      this.infocampeonato = campeonatod;
    }
    this.getPartidos(this.infocampeonato.uid);
    this.getCampeonatos();

    this.opcion2="clasificacion";
    this.getGrupo1(this.infocampeonato.uid);
    this.getGrupo2(this.infocampeonato.uid);
    this.getDescenso(this.infocampeonato.uid);
    this.getCampeonatos();
 
  }
  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }
  changeSegment2(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion2=opc;
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

  async limpiar(){
    this.gru2 = false;
    this.gru1 = false;
    this.ida = false;
    this.vuelta = false;
    this.gene = [];
    this.genef = [];
    this.geneinit = [];
    this.geneida = [];
    this.geneidainit = [];
    this.geneidaf = [];
    this.genevuel = [];
    this.genevuelinit = [];
    this.genevuelf = [];
    this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];

      this.grupoE1=[];
      this.grupoE2=[];
      this.descensoE=[];
      this.grup1=false;
      this.grup2=false,
      this.des=false;
  


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
    this.getPartidos(this.infocampeonato.uid);
    this.getGrupo1(this.infocampeonato.uid);
    this.getGrupo2(this.infocampeonato.uid);
    this.getDescenso(this.infocampeonato.uid);

  }

  async getPartidos(uid:string) {
    const path = 'Campeonatos/'+uid+'/Partidos'; 
    this.equiposInfo = this.firestoreService.getPartidos<EncuentroPrueba>(path).subscribe(res => {
      
      this.encuentro=res[0];
      if(this.encuentro.fechae == "ida" || this.encuentro.fechae == "vuelta" || this.encuentro.fechae == "unico"){
      this.titulo=this.encuentro.tipo;
      }else{
        this.titulo=this.encuentro.fechae;
      }
       this.numero=this.encuentro.numero;
       this.fase = this.encuentro.fechae;

       if(this.fase == "ida" || this.fase == "vuelta" || this.fase == "unico"){
         this.prueba(this.encuentro.tipo);
         this.pruebafina(this.encuentro.tipo);
         this.partidos_init(this.encuentro.tipo);
        this.partidos_ida_vuel_E(this.encuentro.tipo);
        this.partidos_ida_vuel_init(this.encuentro.tipo);
        this.partidos_ida_vuel_fina(this.encuentro.tipo);
        }else{
        this.gene=[];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
       }


      
    });

  }

  async prueba(tipo:string){
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
    this.equiposInfo = this.firestoreService.getCollection<EncuentroPrueba>(path,'tipo','==', tipo,"unico").subscribe(res =>{
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
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
    this.equiposInfo = this.firestoreService.getpartidos_init<EncuentroPrueba>(path,'tipo','==', tipo,"unico").subscribe(res =>{
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
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<EncuentroPrueba>(path,'tipo','==', tipo,"unico").subscribe(res =>{
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
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
    
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
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
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
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
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

  async partidos_ida_vuel_E(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos'; 
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneida = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuel = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupoinit1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_init(tipo: string) {
    const path = 'Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidainit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuelinit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_fina(tipo: string) {
    const path = 'Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidaf = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuelf = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }



  
  async anterior() {

    if (this.numero > 1) {

      this.numero = this.numero - 1;

    }

    console.log(this.numero)

    if (this.numero >= 1 && this.numero < 6) {
      this.titulo = "Fecha " + this.numero;
      this.grupos("Fecha " + this.numero);
      this.gruposfinalizados("Fecha " + this.numero);
      this.partidos_init_fases("Fecha " + this.numero);
      this.gene = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 6) {

      this.titulo = "Descenso"
      this.prueba("Descenso");
      this.pruebafina("Descenso");
      this.partidos_init("Descenso");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;

    } else if (this.numero == 7) {
      this.titulo = "Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.partidos_ida_vuel_E("Cuartos de final");
      this.partidos_ida_vuel_init("Cuartos de final");
      this.partidos_ida_vuel_fina("Cuartos de final");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 8) {
      this.titulo = "Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 9) {
      this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 10) {
      this.titulo = "Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    }
  }

  async siguiente() {
    if (this.numero < 10) {

      this.numero = this.numero + 1;

    }

    console.log(this.numero)
    if (this.numero >= 1 && this.numero < 6) {
      this.titulo = "Fecha " + this.numero;
      this.grupos("Fecha " + this.numero);
      this.gruposfinalizados("Fecha " + this.numero);
      this.partidos_init_fases("Fecha " + this.numero);
      this.gene = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 6) {

      this.titulo = "Descenso"
      this.prueba("Descenso");
      this.pruebafina("Descenso");
      this.partidos_init("Descenso");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;

    } else if (this.numero == 7) {
      this.titulo = "Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.partidos_ida_vuel_E("Cuartos de final");
      this.partidos_ida_vuel_init("Cuartos de final");
      this.partidos_ida_vuel_fina("Cuartos de final");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 8) {
      this.titulo = "Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 9) {
      this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == 10) {
      this.titulo = "Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    }
  }


  // Tabla codigo

  async getGrupo1(uid:string){
    const path = 'Campeonatos/'+uid+'/Equipos'; 
    this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo1').subscribe(res =>{
      this.grupoE1=res;
      console.log(res);
      if(res.length){
        this.grup1=true;
      }
  
    });
  }
  
  async getDescenso(uid:string){
  
    const path = 'Campeonatos/'+uid+'/Equipos'; 
    this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'Descenso').subscribe(res =>{
      this.descensoE=res;
      console.log(res);
      if(res.length){
        this.des=true;
      }
  
    });
  }
  
  
  
  async getGrupo2(uid:string){
    const path = 'Campeonatos/'+uid+'/Equipos'; 
    this.firestoreService.getCollectionGru<Equipos>(path,'grupo','==', 'grupo2').subscribe(res =>{
      this.grupoE2=res;
      console.log(res);
      if(res.length){
        this.grup2=true;
      }
  
        });
  }
  



  
}
