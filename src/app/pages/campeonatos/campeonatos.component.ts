import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Equipos, Campeonatos } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss'],
})
export class CampeonatosComponent implements OnInit {

  grupos=false;
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
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {

    const campeonato = this.firestoreService.getCampeonato();
    if (campeonato !== undefined) {
      this.infocampeonato = campeonato;

    }
    console.log(this.infocampeonato);

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
              this.infocampeonato.tipo = data;

            }

          }

        }
      ]
    });
    await alert.present();
  }
  reset() {
    this.grupos = false;
    this.infocampeonato = {
      uid: '',
      nombre: '',
      fecha: null,
      tipo: '',
      lugar: '',
      estado: 'iniciado',
      grupos: 0,
      fases: 0
    };
  }

  saveCampeonato() {
    console.log(this.infocampeonato);;
    if (this.infocampeonato.nombre == "") {
      this.presentToast("Complete el nombre del campeonato", 2000);
    } else if (this.infocampeonato.tipo == "") {
      this.presentToast("Selecione el tipo de campeonato", 2000);
    } else if (this.infocampeonato.tipo == "Fase de grupos") {
      if (this.infocampeonato.grupos == 0) {
        this.presentToast("Especifique el numero de grupos", 2000);
      } else {
        const path = 'Campeonatos';
        // this.gruposnumero(this.infocampeonato.grupos, this.infocampeonato.uid);
        this.firestoreService.createDoc(this.infocampeonato, path, this.infocampeonato.uid).then(res => {
          this.presentLoading('Actualizando campeonato', 1500);


          this.infocampeonato = {
            uid: '',
            nombre: '',
            fecha: null,
            tipo: '',
            lugar: '',
            estado: 'iniciado',
            grupos: 0,
            fases: 0
          };

        }).catch(error => {
          console.log(error)
        });

      }
    } else {

    }

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
