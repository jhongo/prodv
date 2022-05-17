import { Component, OnInit } from '@angular/core';
import { Campeonatos, Equipos } from 'src/app/models';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';

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
  campeonatos: Campeonatos[] = [];

  newcampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
  };

  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) { }

  ngOnInit() {
    this.getCampeonatos();
    // this.getGrupo2();
    this.sumagrupos();
  }

  async getGrupo2(busqueda: string) {

    const path = 'Equipos';
    // for (var a = 0; a <= 2; a++) {
      this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', busqueda).subscribe(res => {
        this.grupo2 =res;
        console.log(res);
      });
    // }

  }




  reset() {
    this.grupos = false;
  }

  sumagrupos() {

    const valor = 4;
    for (var a = 1; a <= valor; a++) {
      this.numero = [...this.numero, 'Grupo ' + a];
      const text = "grupo" + a;
      console.log(this.numero);
      this.getGrupo2(text);


    }




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

  async getGrupos() {
    const path = 'Campeonatos/' + '';
    this.firestoreService.getgrupos<Campeonatos>(path, 'grupo', '==', 'grupo1').subscribe(res => {
      if (res.length) {
        this.grupose = res;
      }
    });
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
        this.gruposnumero(this.newcampeonato.grupos, this.newcampeonato.uid);
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
