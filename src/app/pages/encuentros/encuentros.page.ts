import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, LoadingController, ToastController } from '@ionic/angular';
import { EncuentroPrueba, Equipos, Encuentro } from 'src/app/models';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.page.html',
  styleUrls: ['./encuentros.page.scss'],
})
export class EncuentrosPage implements OnInit {

  estado = false;
  grupo = false;
  equiposInfo: Subscription;
  grupo1 = false;
  grupo2 = false;
  fecha = false;
  gene = false;
  team: Encuentro[] = [];
  team1: Equipos[] = [];
  team2: Equipos[] = [];
  teamg: Equipos[] = [];
  fase="";

  cuartos: Encuentro []=[];
  semi: Encuentro []=[];
  final: Encuentro []=[];

  cuarto=false;
  semis=false;
  fina=false;
  fases=false;

  escudo1 = '';
  escudo2 = '';
  uid1 = '';
  uid2 = '';

  equipo1: Equipos = {
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

  equipo2: Equipos = {
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

  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'
  formatedString = '';

  encuentro: EncuentroPrueba = {
    uid: '',
    fechae: '',
    numero: 0,
    tipo: '',
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

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) {

    // this.setToday();
   

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

  async ngOnInit() {

    console.log(this.encuentro.grupo);
    //  this.getPartidos();
    this.getPartido("Fecha 1");
    this.fase="Fecha 1";
    this.getPartCuar();
    this.getPartsemi();
    this.getPartfinal();

  }

  setToday() {
    this.formatedString = format(parseISO(format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyy');
  }
  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.encuentro.fecha=value;
    console.log(value);
  }

  async calculo(){
    console.log(this.encuentro.fecha);
  
    let fechaac = new Date(this.encuentro.fecha);
    let dias = 21;
    fechaac.setDate(fechaac.getDate());
    this.encuentro.fecha=fechaac;
    console.log(this.encuentro.fecha);
  
  }

  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }


  async getEquiposG1() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'grupo', '==', 'grupo1').subscribe(res => {
      if (res.length) {
        this.team1 = res;
      }
    });
  }

  async getPartidos() {
    const path = 'Partidos';
    this.equiposInfo = this.firestoreService.getTeam<Encuentro>(path).subscribe(res => {
      this.team = res;
    });
  }

  async getEquiposG2() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'grupo', '==', 'grupo2').subscribe(res => {
      if (res.length) {
        this.team2 = res;
      }
    });
  }
  async getEquiposG() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getTeam<Equipos>(path).subscribe(res => {
      this.teamg = res;
    });
  }
  async completardatos(uid: string) {

    const path = 'Equipos';
    const pathp = 'Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];

        this.escudo1 = this.equipo1.escudo;
        this.uid1 = this.equipo1.uid;
        this.encuentro.escudo_e1 = this.escudo1;
        this.encuentro.uid_e1 = this.uid1;
        const data = {
          escudo_e1: this.escudo1,
          uid_e1: this.uid1
        }
        console.log(data)

        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });


      }
    });

    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e2).subscribe(res => {
      if (res.length) {
        this.equipo2 = res[0];
        // console.log(res[0]);
        // console.log(this.equipo2.escudo);
        this.escudo2 = this.equipo2.escudo;
        this.uid2 = this.equipo2.uid;
        this.encuentro.escudo_e2 = this.escudo2;
        this.encuentro.uid_e2 = this.uid2;
        const data = {
          escudo_e2: this.escudo2,
          uid_e2: this.uid2
        }
        console.log(data)
        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });


      }
    });

    console.log(this.encuentro);


  }

  async getMatch(equipo: Encuentro) {
    console.log('Click en getEquipo');
    console.log(equipo);
    this.firestoreService.setMatch(equipo);

  }

  async reset() {
    this.estado = false;
    this.grupo = false;
    this.grupo1 = false;
    this.grupo2 = false;
    this.fecha = false;
    this.gene = false;
    this.encuentro.nombre_e1 = "";
    this.encuentro.nombre_e2 = "";
    this.encuentro.fechae = "";
    this.encuentro.grupo = "";
    this.encuentro.tipo="";

  }
  async saveMatch() {
    this.encuentro.uid = this.firestoreService.getId();
   
    if(this.encuentro.fecha==null){
      this.presentToast("Eliga fecha del partido", 2000);
    }else{
      if (this.encuentro.tipo == "") {
        this.presentToast("Eliga el tipo de partido", 2000);
      } else {
        if (this.encuentro.nombre_e1 == "" || this.encuentro.nombre_e2 == "") {
          this.presentToast("Eliga los equipos", 2000);
        } else {
          if (this.encuentro.nombre_e1 == this.encuentro.nombre_e2) {
            this.presentToast("Los equipos son los mismos", 2000);
          } else {
  
            console.log(this.encuentro.nombre_e1 + " " + this.encuentro.nombre_e2);
            const path = 'Partidos';
            // this.calculo();
            // console.log(this.encuentro);
  
            this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
              console.log('guardado con exito');
              this.presentLoading('Guardando partido', 1500);
              this.completardatos(this.encuentro.uid);
              this.encuentro = {
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
              };
              this.estado = false;
              this.grupo = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.fecha = false;
              this.gene = false;
  
            }).catch(error => {
              console.log(error)
            });
  
          }
  
  
        }
  
  
  
      }
    }

    

  }

  async newFecha() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Seleccione fecha: ',
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
              this.encuentro.fechae=data;
              this.encuentro.numero=1;
            }
            if (data === 'Fecha 2') {
              this.encuentro.fechae=data;
              this.encuentro.numero=2;
            }
            if (data === 'Fecha 3') {
              this.encuentro.fechae=data;
              this.encuentro.numero=3;
            }
            if (data === 'Fecha 4') {
              this.encuentro.fechae=data;
              this.encuentro.numero=4;
            }
            // if (data === 'Fecha 5') {
            //   this.encuentro.numero=5;
            // }
            

          }
        }
      ]
    });
    await alert.present();
  }

  async newMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de partido: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fase de grupos',
          value: 'Fase de grupos',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Cuartos de final',
          value: 'Cuartos de final'
        },
        {
          name: 'radio3',
          type: 'radio',
          cssClass: 'input',
          label: 'Semifinal',
          value: 'Semifinal'
        },
        {
          name: 'radio4',
          type: 'radio',
          cssClass: 'input',
          label: 'Final',
          value: 'Final'
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
            if (data === 'Fase de grupos') {
              this.encuentro.tipo = data;
              this.grupo = true;
              this.fecha = true;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              // this.router.navigate(['/destete']);

            }
            if (data === 'Cuartos de final') {
              this.encuentro.tipo = data;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero=5;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();
            }
            if (data === 'Semifinal') {
              this.encuentro.tipo = data;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero=6;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();
            } if (data === 'Final') {
              this.encuentro.tipo = data;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero=7;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();

            }
          }

        }
      ]
    });
    await alert.present();
  }

  async newTeam() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Partido del grupo: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Grupo 1',
          value: 'Grupo 1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Grupo 2',
          value: 'Grupo 2'
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
            if (data === 'Grupo 1') {
              this.encuentro.grupo = data;
              this.grupo1 = true;
              this.grupo2 = false;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.getEquiposG1();
            }
            if (data === 'Grupo 2') {
              this.grupo1 = false;
              this.grupo2 = true;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.grupo = data;
              this.getEquiposG2();
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: "middle"
    });
    toast.present();
  }

  async presentLoading(mensaje: string, tiempo: number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
