import { Component, OnInit, ViewChild } from '@angular/core';
import { Campeonatos, Equipos } from 'src/app/models';
import { AlertController, LoadingController, ToastController, IonDatetime } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-newcampeonato',
  templateUrl: './newcampeonato.component.html',
  styleUrls: ['./newcampeonato.component.scss'],
})
export class NewcampeonatoComponent implements OnInit {

  estado = false;
  grupos = false;
  numero = [];
  equipoInfo: Subscription;
  grupose: Campeonatos[] = [];
  grupo2: Equipos[] = [];
  grupoT=[];
  campeonatos: Campeonatos[] = [];

  newcampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
    fases: 0
  };


  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'
  formatedString = '';
  
  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) { }

  ngOnInit() {
    this.getCampeonatos();
    // this.getGrupo2();
    // this.sumagrupos();
  }

  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.newcampeonato.fecha = value;
    console.log(value);
  }


  async getGrupo2(busqueda: string) {

    const path = 'Equipos';
    //  for (let a = 0; a < this.numero.length; a++) {
      //  const grupo= "grupo"+this.numero[a]
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', busqueda).subscribe(res => {
        this.grupo2 = res;
        // this.grupo2 = [...this.grupoT, this.grupo2];
        console.log(res);
      });
    //  }

  }

  // async gruposgeneral(){
  //   const path = 'Campeonatos/';
  //   this.firestoreService.getcampeonatosprueba(path,'zr4PWguRhpMrwncvyg6q').subscribe( res =>{
  //     console.log(res);
  //   });

  // }

  async getCampeonato(campeonato: Campeonatos) {
    console.log('Click en getEquipo');
    console.log(campeonato);
    this.firestoreService.setCampeonato(campeonato);

  }


  reset() {
    this.grupos = false;
    this.newcampeonato = {
      uid: '',
      nombre: '',
      fecha: null,
      tipo: '',
      lugar: '',
      estado: 'iniciado',
      grupos: 0,
      fases: 0
    };
    this.formatedString='';
  }


  getCampeonatos() {
    const path = 'Campeonatos';
    this.equipoInfo = this.firestoreService.getTeam<Campeonatos>(path).subscribe(res => {
      this.campeonatos = res;
    });

  }

  async gruposnumero(numero: number, uid: string) {


    for (var a = 1; a <= numero; a++) {

      console.log("grupo " + a);
      const uidn = this.firestoreService.getId();
      const path = "Campeonatos/" + uid + "/Grupo " + a;
      const data = {
      }

      this.firestoreService.createDoc(data, path, uidn).then(res => {

      }).catch(error => {
        console.log(error)
      });


    }



  }



  saveCampeonato() {
    console.log(this.newcampeonato);

    this.newcampeonato.uid = this.firestoreService.getId();
    if (this.newcampeonato.nombre == "") {
      this.presentToast("Complete el nombre del campeonato", 2000);
    } else if (this.newcampeonato.tipo == "") {
      this.presentToast("Selecione el tipo de campeonato", 2000);
    } else if (this.newcampeonato.tipo == "Fase de grupos") {
      if (this.newcampeonato.grupos == 0) {
        this.presentToast("Especifique el numero de grupos", 2000);
      } else {
        const path = 'Campeonatos';
        // this.gruposnumero(this.newcampeonato.grupos, this.newcampeonato.uid);
        this.firestoreService.createDoc(this.newcampeonato, path, this.newcampeonato.uid).then(res => {
          this.presentLoading('Guardando campeonato', 1500);


          this.newcampeonato = {
            uid: '',
            nombre: '',
            fecha: null,
            tipo: '',
            lugar: '',
            estado: 'iniciado',
            grupos: 0,
            fases: 0
          };
          this.estado = false;

        }).catch(error => {
          console.log(error)
        });

      }
    } else {

    }

  }



  async tipocam() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de campeonato: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fase de grupos',
          value: 'Fase de grupos',
          checked: true
        }
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
              this.grupos = true;
              this.newcampeonato.tipo = data;

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
