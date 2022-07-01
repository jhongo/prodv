import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { Encuentro, EncuentroPrueba, Campeonatos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  matches = [];
  _category = 'sports';
  _language = 'es';
  _apiKey = 'cbb27a56d7c0f51b7e10fca6afa34bbf';
  news = [];
  equipoInfo: Subscription;
  antsig=false;
  equiposInfo: Subscription;

  valoragg=0;


  genef: EncuentroPrueba[] = [];
  gene: EncuentroPrueba[] = [];
  geneinit: EncuentroPrueba[] = [];
  grupo1: EncuentroPrueba[] = [];
  grupo2: EncuentroPrueba[] = [];
  grupo3 :EncuentroPrueba []=[];
  grupo4 :EncuentroPrueba []=[];
  grupo5 :EncuentroPrueba []=[];
  grupo6 :EncuentroPrueba []=[];
  grupo7 :EncuentroPrueba []=[];
  grupo8 :EncuentroPrueba []=[];
  grupo9 :EncuentroPrueba []=[];
  grupo10 :EncuentroPrueba []=[]
  grupoinit1: EncuentroPrueba[] = [];
  grupoinit2: EncuentroPrueba[] = [];
  grupoinit3:EncuentroPrueba[]=[];
  grupoinit4: EncuentroPrueba[]=[];
  grupoinit5:EncuentroPrueba[]=[];
  grupoinit6: EncuentroPrueba[]=[];
  grupoinit7:EncuentroPrueba[]=[];
  grupoinit8: EncuentroPrueba[]=[];
  grupoinit9:EncuentroPrueba[]=[];
  grupoinit10: EncuentroPrueba[]=[];
  grupof1: EncuentroPrueba[] = [];
  grupof2: EncuentroPrueba[] = [];
  grupof3 :EncuentroPrueba []=[];
  grupof4 :EncuentroPrueba []=[];
  grupof5 :EncuentroPrueba []=[];
  grupof6 :EncuentroPrueba []=[];
  grupof7 :EncuentroPrueba []=[];
  grupof8 :EncuentroPrueba []=[];
  grupof9 :EncuentroPrueba []=[];
  grupof10 :EncuentroPrueba []=[];
  geneida: EncuentroPrueba[] = [];
  geneidainit: EncuentroPrueba[] = [];
  geneidaf: EncuentroPrueba[] = [];
  genevuel: EncuentroPrueba[] = [];
  genevuelinit: EncuentroPrueba[] = [];
  genevuelf: EncuentroPrueba[] = [];


  cuarto = false;
  semis = false;
  fina = false;
  fases = false;
  ida = false;
  vuelta = false;
  descenso = false;

  titulo = "";
  gru1 = false;
  gru2 = false;
  gru3=false;
  gru4=false;
  gru5=false;
  gru6=false;
  gru7=false;
  gru8=false;
  gru9=false;
  gru10=false;

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
  opciong = "";
  fase = "";
  numero = 0;

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

  constructor(public firestoreService: FirestoreService,
    public alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.infocampeonato.uid="3BuPLlNAQ7yA4yo8Karg";
    // this.infocampeonato.nombre="Copa Gualaquiza";
    this.getCampeonatos();
    // this.getPartidos(this.infocampeonato.uid);
    this.opciong = "Noticias";
    this.opcion = "Copa_Gualaquiza";
    
    // this.infocampeonato.fases = 5;
    


    // API NOTICIAS DEPORTIVAS
    // this.http.get<any>('https://newsapi.org/v2/top-headlines',
    //   {
    //     params: {
    //       'categories': this._category,
    //       'languages': this._language,
    //       'access_key': this._apiKey,
    //     }
    //   }
    // ).subscribe(resp => {
    //   console.log(resp);
    //   this.news = resp.articles
    //   console.log(this.news);
    // });

    //API RESULTADOS DEPORTIVOS
    this.http.get<any>('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '057eb7678fa2d34dca7c319ce9a57a7d'
      }
    }).subscribe(res => {
      console.log(res);
      this.matches = res.response;
      console.log(res.response);
    });


  }


  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion = opc;

  }
  segment(event: any) {
    const option = event.detail.value;
    console.log(option);
    // this.opciong = option;
    
    this.limpiar();
    
  }

  getCampeonatos() {
    const path = 'Campeonatos';
    this.equipoInfo = this.firestoreService.getTeamfecha<Campeonatos>(path).subscribe(res => {
      this.campeonatos = res;

      if(res.length){

        this.infocampeonato=res[0];
        this.getPartidos(this.infocampeonato.uid);
        

      }
    });

  }

  segmentChange(event: any) {
    const option = event.detail.value;
    console.log(option);
    this.opciong = option;
    if (this.opciong == "Partidos") {
      this.opcion = "Copa_Gualaquiza";
    } else {
      this.opciong = option;
    }
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

    

  }

  async limpiar(){
    this.titulo="";
    this.antsig=false;
    this.gru1 = false;
    this.gru2 = false;
    this.gru3 = false;
    this.gru4 = false;
    this.gru5 = false;
    this.gru6 = false;
    this.gru7 = false;
    this.gru8 = false;
    this.gru9 = false;
    this.gru10 = false;
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
    this.grupo3 = [];
    this.grupo4 = [];
    this.grupo5 = [];
    this.grupo6 = [];
    this.grupo7 = [];
    this.grupo8 = [];
    this.grupo9 = [];
    this.grupo10 = [];
    this.grupof1 = [];
    this.grupof2 = [];
    this.grupof3 = [];
    this.grupof4 = [];
    this.grupof5 = [];
    this.grupof6 = [];
    this.grupof7 = [];
    this.grupof8 = [];
    this.grupof9 = [];
    this.grupof10 = [];
    this.grupoinit1 = [];
    this.grupoinit2 = [];
    this.grupoinit3 = [];
    this.grupoinit4 = [];
    this.grupoinit5 = [];
    this.grupoinit6 = [];
    this.grupoinit7 = [];
    this.grupoinit8 = [];
    this.grupoinit9 = [];
    this.grupoinit10 = [];


  }


  async getPartidos(uid:string) {
    const path = 'Campeonatos/'+uid+'/Partidos';    
    this.equiposInfo = this.firestoreService.getPartidos<EncuentroPrueba>(path).subscribe(res => {
      if(res.length){
        this.antsig=true;
      }else{
        this.antsig=false;
      }

      this.encuentro = res[0];
      if (this.encuentro.fechae == "ida" || this.encuentro.fechae == "vuelta" || this.encuentro.fechae == "unico") {
        this.titulo = this.encuentro.tipo;
      } else {
        this.titulo = this.encuentro.fechae;
      }
      this.numero = this.encuentro.numero;
      this.fase = this.encuentro.fechae;

      if (this.fase == "ida" || this.fase == "vuelta" || this.fase == "unico") {
        this.prueba(this.encuentro.tipo);
        this.pruebafina(this.encuentro.tipo);
        this.partidos_init(this.encuentro.tipo);
        this.partidos_ida_vuel_E(this.encuentro.tipo);
        this.partidos_ida_vuel_init(this.encuentro.tipo);
        this.partidos_ida_vuel_fina(this.encuentro.tipo);
      } else {
        this.gene = [];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
      }



    });
  

  }

  async prueba(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
 
    this.equiposInfo = this.firestoreService.getCollection<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {

      this.gene = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
      if(res.length){
        // this.titulo=titulo; 
      }else{
        this.valoragg++;
        // console.log("Prueba: ",this.valoragg);
      }

    });
  }
  async partidos_init(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.equiposInfo = this.firestoreService.getpartidos_init<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {

      this.geneinit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
      if(res.length){
        // this.titulo=titulo;
      }else{
        this.valoragg++;
        // console.log("Prueba init: ",this.valoragg);
      }


    });

  }
  async pruebafina(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {

      this.genef = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
      if(res.length){
        // this.titulo=titulo;
      }else{
        this.valoragg++;
        // console.log("Prueba final: ",this.valoragg);
        if(this.valoragg==3){
          // console.log("valor reiniciado ",this.valoragg);
          // if(titulo=="Descenso"&&this.numero==this.infocampeonato.fases+1){
          //   this.numero=this.infocampeonato.fases+2;
          //   this.valoragg=0;
          // }
        }
      } 
    });
  }


  async grupos(fase: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupo1 = res;
      if (res.length) {
        this.gru1 = true;
        this.gene = [];
        this.genef = []; 
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupo2 = res;
      if (res.length) {
        this.gru2 = true;
        this.gene = [];
        this.genef = [];
      } else {
        // this.gru2=false;
      }
    });
    
    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 3', fase).subscribe(res=>{
      this.grupo3=res;
      if(res.length){
        this.gru3=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 4', fase).subscribe(res=>{
      this.grupo4=res;
      if(res.length){
        this.gru4=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 5', fase).subscribe(res=>{
      this.grupo5=res;
      if(res.length){
        this.gru5=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 6', fase).subscribe(res=>{
      this.grupo6=res;
      if(res.length){
        this.gru6=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 7', fase).subscribe(res=>{
      this.grupo7=res;
      if(res.length){
        this.gru7=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 8', fase).subscribe(res=>{
      this.grupo8=res;
      if(res.length){
        this.gru8=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 9', fase).subscribe(res=>{
      this.grupo9=res;
      if(res.length){
        this.gru9=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo','==','Grupo 10', fase).subscribe(res=>{
      this.grupo10=res;
      if(res.length){
        this.gru10=true;
      }else{
        // this.gru2=false;
      }
    });




  }

  async gruposfinalizados(fase: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupof1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupof2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });
    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 3', fase).subscribe(res=>{
      this.grupof3=res;
      if(res.length){
        this.gru3=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 4', fase).subscribe(res=>{
      this.grupof4=res;
      if(res.length){
        this.gru4=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 5', fase).subscribe(res=>{
      this.grupof5=res;
      if(res.length){
        this.gru5=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 6', fase).subscribe(res=>{
      this.grupof6=res;
      if(res.length){
        this.gru6=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 7', fase).subscribe(res=>{
      this.grupof7=res;
      if(res.length){
        this.gru7=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 8', fase).subscribe(res=>{
      this.grupof8=res;
      if(res.length){
        this.gru8=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 9', fase).subscribe(res=>{
      this.grupof9=res;
      if(res.length){
        this.gru9=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo','==','Grupo 10', fase).subscribe(res=>{
      this.grupof10=res;
      if(res.length){
        this.gru10=true;
      }else{
        // this.gru2=false;
      }
    });



  }

  async partidos_init_fases(fase: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupoinit1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupoinit2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 3', fase).subscribe(res=>{
      this.grupoinit3=res;
      if(res.length){
        this.gru3=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 4', fase).subscribe(res=>{
      this.grupoinit4=res;
      if(res.length){
        this.gru4=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 5', fase).subscribe(res=>{
      this.grupoinit5=res;
      if(res.length){
        this.gru5=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 6', fase).subscribe(res=>{
      this.grupoinit6=res;
      if(res.length){
        this.gru6=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 7', fase).subscribe(res=>{
      this.grupoinit7=res;
      if(res.length){
        this.gru7=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 8', fase).subscribe(res=>{
      this.grupoinit8=res;
      if(res.length){
        this.gru8=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 9', fase).subscribe(res=>{
      this.grupoinit9=res;
      if(res.length){
        this.gru9=true;
      }else{
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo','==','Grupo 10', fase).subscribe(res=>{
      this.grupoinit10=res;
      if(res.length){
        this.gru10=true;
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
        // this.titulo=titulo;
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
        // this.titulo=titulo;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_init(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidainit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
        // this.titulo=titulo;
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
        // this.titulo=titulo;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_fina(tipo: string) {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidaf = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
        // this.titulo=titulo;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuelf= res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
        // this.titulo=titulo;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }




  async anterior() {
    
    if (this.numero > 1) {

      this.numero = this.numero - 1;

    }
    console.log(this.titulo);
    console.log(this.numero)

    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
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
      this.gru1 = false;
      this.gru2 = false;
      this.gru3 = false;
      this.gru4 = false;
      this.gru5 = false;
      this.gru6 = false;
      this.gru7 = false;
      this.gru8 = false;
      this.gru9 = false;
      this.gru10 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases+1 ) {
      this.valoragg=0;
       this.titulo = "Descenso"
      this.prueba("Descenso");
      this.partidos_init("Descenso");
      this.pruebafina("Descenso");
      
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.limpiargrupos();

    } else if (this.numero == this.infocampeonato.fases+2) {
      this.titulo = "Cuartos de final"
      this.valoragg=0;
      this.prueba("Cuartos de final",);
      this.partidos_init("Cuartos de final",);
      this.pruebafina("Cuartos de final",);
      this.partidos_ida_vuel_E("Cuartos de final",);
      this.partidos_ida_vuel_init("Cuartos de final",);
      this.partidos_ida_vuel_fina("Cuartos de final",);
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+3) {
      this.valoragg=0;
      this.titulo = "Semifinal";
      this.prueba("Semifinal");
      this.partidos_init("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+4) {
       this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+5) {
       this.titulo = "Final";
      this.prueba("Final");
      this.partidos_init("Final");
      this.pruebafina("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.limpiargrupos();
    }
  }

  async limpiargrupos(){
    this.grupoinit1 = [];
    this.grupoinit2 = [];
    this.grupoinit3 = [];
    this.grupoinit4 = [];
    this.grupoinit5 = [];
    this.grupoinit5 = [];
    this.grupoinit7 = [];
    this.grupoinit8 = [];
    this.grupoinit9 = [];
    this.grupoinit10= [];
    
    this.grupo1 = [];
    this.grupo2 = [];
    this.grupo3 = [];
    this.grupo4 = [];
    this.grupo5 = [];
    this.grupo6 = [];
    this.grupo7 = [];
    this.grupo8 = [];
    this.grupo9 = [];
    this.grupo10 = [];

    this.grupof1 = [];
    this.grupof2 = [];
    this.grupof3 = [];
    this.grupof4 = [];
    this.grupof5 = [];
    this.grupof6 = [];
    this.grupof7 = [];
    this.grupof8 = [];
    this.grupof9 = [];
    this.grupof10 = [];


    this.gru1 = false;
    this.gru2 = false;
    this.gru3 = false;
    this.gru4 = false;
    this.gru5 = false;
    this.gru6 = false;
    this.gru7 = false;
    this.gru8 = false;
    this.gru9 = false;
    this.gru10 = false;
    this.ida = false;
    this.vuelta = false;

  }


  async siguiente() {
    if (this.numero < this.infocampeonato.fases+5) {
      this.numero = this.numero + 1;
    }

    console.log(this.numero)
    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
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
      this.gru1 = false;
      this.gru2 = false;
      this.gru3 = false;
      this.gru4 = false;
      this.gru5 = false;
      this.gru6 = false;
      this.gru7 = false;
      this.gru8 = false;
      this.gru9 = false;
      this.gru10 = false;
      
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases+1) {

      this.titulo = "Descenso"
      this.valoragg=0;
      this.prueba("Descenso");
      this.partidos_init("Descenso");
      this.pruebafina("Descenso");

      console.log("Descensoooo", this.numero );

    
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.limpiargrupos();
     

    } else if (this.numero == this.infocampeonato.fases+2) {
      this.titulo = "Cuartos de final"
      this.valoragg=0;
      this.prueba("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_ida_vuel_E("Cuartos de final");
      this.partidos_ida_vuel_init("Cuartos de final");
      this.partidos_ida_vuel_fina("Cuartos de final");
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+3) {
      this.titulo = "Semifinal";
      console.log("Semiiiillll", this.numero );
      this.prueba("Semifinal");
      this.partidos_init("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+4) {
      this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.limpiargrupos();
    } else if (this.numero == this.infocampeonato.fases+5) {
      this.titulo = "Final";
      this.prueba("Final");
      this.partidos_init("Final");
      this.pruebafina("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.limpiargrupos();
    }
  }




}
