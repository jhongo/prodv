import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController, AlertController, IonDatetime } from '@ionic/angular';
import { Encuentro, Equipos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-partido',
  templateUrl: './edit-partido.component.html',
  styleUrls: ['./edit-partido.component.scss'],
})
export class EditPartidoComponent implements OnInit {

  grupo = false;
  grupo1 = false;
  grupo2 = false;
  equiposInfo: Subscription;
  team1: Equipos[] = [];
  team2: Equipos[] = [];
  team: Encuentro[] = [];
 
  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'
  formatedString = '';

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

  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fechae: 0,
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


  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) {
    this.setToday();
  }

  setToday() {
    this.formatedString = format(parseISO(format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyy');
  }
  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.encuentro.fecha = this.formatedString;
    this.showPicker = false;
    console.log(value);
  }

  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  ngOnInit() {
    const match = this.firestoreService.getMatch();
    if (match !== undefined) {
      this.encuentro = match;
      if (this.encuentro.grupo == "Grupo 1") {
        this.grupo1 = true;
        this.grupo2 = false;
      } else if (this.encuentro.grupo == "Grupo 2") {
        this.grupo1 = false;
        this.grupo2 = true;
      }
    }
    console.log(this.encuentro);
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

  async actualizarpuntos(uid1:string,uid2:string) {
    const data={
      puntos: this.equipo1.puntos,
      p_j: 0,
      p_g: 0,
      p_e: 0,
      p_p: 0,
      g_f: 0,
      g_c: 0,
      d_g: 0


    }
      const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'uid', '==', this.encuentro.uid_e1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];
        // console.log(this.equipo1);

        if (this.encuentro.res_e1 == this.encuentro.res_e2) {
          console.log("empate" + this.encuentro.res_e1 + "-" + this.encuentro.res_e2)
          this.equipo1.puntos = this.equipo1.puntos + 1;
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_e = this.equipo1.p_e + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;


        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e1);
          this.equipo1.puntos = this.equipo1.puntos + 3;
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_g = this.equipo1.p_e + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;



        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e2);
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_p = this.equipo1.p_e + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;
        }
        
        console.log(this.equipo1);
        const data = {
          puntos: this.equipo1.puntos,
          p_j: this.equipo1.p_j,
          p_g: this.equipo1.p_g,
          p_e: this.equipo1.p_e,
          p_p: this.equipo1.p_p,
          g_f: this.equipo1.g_f,
          g_c: this.equipo1.g_c,
          d_g: this.equipo1.d_g
        }
        console.log(data)

        this.firestoreService.actualizarpartido(data, path, uid1).then(res => { });
      }
    });

    this.equiposInfo = this.firestoreService.getCollection<Equipos>(path, 'uid', '==', this.encuentro.uid_e2).subscribe(res => {
      if (res.length) {
        this.equipo2 = res[0];
        // console.log(this.equipo2);

        if (this.encuentro.res_e1 == this.encuentro.res_e2) {

          console.log("empate" + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          this.equipo2.puntos = this.equipo2.puntos + 1;
          this.equipo2.p_j = this.equipo2.p_j + 1;
          this.equipo2.p_e = this.equipo2.p_e + 1;
          this.equipo2.g_f = this.equipo2.g_f + this.encuentro.res_e2;
          this.equipo2.g_c = this.equipo2.g_c + this.encuentro.res_e1
        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e1);
          this.equipo2.p_j = this.equipo2.p_j + 1;
          this.equipo2.p_p = this.equipo2.p_e + 1;
          this.equipo2.g_f = this.equipo2.g_f + this.encuentro.res_e1;
          this.equipo2.g_c = this.equipo2.g_c + this.encuentro.res_e2;
        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e2);
          this.equipo2.puntos = this.equipo2.puntos + 3;
          this.equipo2.p_j = this.equipo2.p_j + 1;
          this.equipo2.p_g = this.equipo2.p_e + 1;
          this.equipo2.g_f = this.equipo2.g_f + this.encuentro.res_e2;
          this.equipo2.g_c = this.equipo2.g_c + this.encuentro.res_e1;

        }
        

        const data = {
          puntos: this.equipo1.puntos,
          p_j: this.equipo2.p_j,
          p_g: this.equipo2.p_g,
          p_e: this.equipo2.p_e,
          p_p: this.equipo2.p_p,
          g_f: this.equipo2.g_f,
          g_c: this.equipo2.g_c,
          d_g: this.equipo2.d_g
        }
        console.log(data)
        this.firestoreService.actualizarpartido(data, path, uid2).then(res => {});
      }
    });
    // console.log(this.equipo1);
    // console.log(this.equipo2);
    
  
  }

  async saveMatch() {
    this.actualizarpuntos(this.encuentro.uid_e1,this.encuentro.uid_e2);
    const path = 'Partidos';
    this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
      console.log('guardado con exito');
      
      this.presentLoading('Actualizando resultado', 1500);
      setTimeout(() => {
        this.router.navigate(['/tab-campeonato/encuentros']);
      }, 1000);
      this.encuentro = {
        uid: '',
        tipo: '',
        fechae: 0,
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
      };


    }).catch(error => {
      console.log(error)
    });

  }



  async deleteMatch() {
    const path = "Partidos";
    this.firestoreService.deletepartido(path, this.encuentro.uid).then(res => {
      this.presentLoading('Eliminando', 1500);
      setTimeout(() => {
        this.router.navigate(['/tab-campeonato/encuentros']);
      }, 1000);
    }).catch(error => {
      console.log(error)
    });
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

  async restart() {
    this.router.navigate(['tab-campeonato/encuentros'])

    this.encuentro = {
      uid: null,
      tipo: null,
      fechae: 0,
      fecha: null,
      grupo: null,
      uid_e1: null,
      uid_e2: null,
      estado: 'iniciado',
      res_e1: 0,
      res_e2: 0,
      escudo_e1: null,
      escudo_e2: null,
      nombre_e1: null,
      nombre_e2: null,
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
