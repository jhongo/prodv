import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonDatetime } from '@ionic/angular';
import { Encuentro, Equipos } from 'src/app/models';
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
  team: Equipos[] = [];

  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'
  formatedString = '';



  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fecha: null,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: '',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
  }

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService) { 

      this. setToday();
    }


  ngOnInit() {

    console.log(this.encuentro.grupo);

  }

  setToday(){
    this.formatedString = format(parseISO(format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyy');
  }
  dateChanged(value){
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    console.log(value);
    

  }

  close(){
    this.datetime.cancel(true);
  }

  select(){
    this.datetime.confirm(true);
  }


  async getEquiposG1() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'grupo', '==', 'grupo1').subscribe(res => {
      if (res.length) {
        this.team = res;
      }
    });
  }

  async getEquipos() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getTeam<Equipos>(path).subscribe(res => {
      this.team = res;
    });
  }

  async getEquiposG2() {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'grupo', '==', 'grupo2').subscribe(res => {
      this.team = res;
    });
  }


  async saveMatch() {

    console.log(this.encuentro.nombre_e1+" "+this.encuentro.nombre_e2);
  }


  async newMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de jaula',
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
              // this.router.navigate(['/destete']);

            }
            if (data === 'Cuartos de final') {
              this.encuentro.tipo = data;

            }
            if (data === 'Semifinal') {
              this.encuentro.tipo = data;

            } if (data === 'Final') {
              this.encuentro.tipo = data;

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
      header: 'Tipo de jaula',
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
              this.encuentro.nombre_e1="";
              this.encuentro.nombre_e2="";
              this.getEquiposG1();
            }
            if (data === 'Grupo 2') {
              this.grupo1 = false;
              this.grupo2 = true;
              this.encuentro.nombre_e1="";
              this.encuentro.nombre_e2="";
              this.encuentro.grupo = data;
              this.getEquiposG2();
            }

          }
        }
      ]
    });
    await alert.present();
  }


}
