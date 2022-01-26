import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Encuentro } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  equiposInfo: Subscription;
  team: Encuentro[] = [];
  cuartos: Encuentro []=[];
  semi: Encuentro []=[];
  final: Encuentro []=[];

  cuarto=false;
  semis=false;
  fina=false;
  fases=false;

  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fechae: '',
    fecha: '',
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

  modes = ['Copa Gualaquiza', 'Liga Pro', 'Internacional']; 
  selectedMode = 'Copa Gualaquiza';

  fase="";
  constructor(public firestoreService: FirestoreService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getPartido("Fecha 1");
    this.fase="Fecha 1";
    this.getPartCuar();
    this.getPartsemi();
    this.getPartfinal();
    // this.getPartidos();
  }

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.selectedMode=opc;
    

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
    this.equiposInfo = this.firestoreService.getTeam<Encuentro>(path).subscribe(res => {
      if(res.length==0){

      }else{
        this.team = res;
        this.fases=true
      }
      });
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
      
      this.semi=res;
      if(res.length==0){
        this.semis=false;
      }else{
        this.semis=true;
        
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
