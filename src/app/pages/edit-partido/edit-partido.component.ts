import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController, AlertController, IonDatetime } from '@ionic/angular';
import { Encuentro, Equipos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { EncuentroPrueba } from '../../models';
import { clearScreenDown } from 'readline';
import { chownSync } from 'fs';
@Component({
  selector: 'app-edit-partido',
  templateUrl: './edit-partido.component.html',
  styleUrls: ['./edit-partido.component.scss'],
})
export class EditPartidoComponent implements OnInit, OnDestroy {

  grupo = false;
  grupo1 = false;
  grupo2 = false;
  boton= true;
  equiposInfo: Subscription;
  equiposInfo1: Subscription;
  formatedString = '';
  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'


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

  encuentro: EncuentroPrueba = {
    uid: '',
    tipo: '',
    fechae: '',
    fecha: null,
    numero: 0,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'espera',
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

  }



  ngOnInit() {
    const match = this.firestoreService.getMatch();
    if (match !== undefined) {
      this.encuentro = match;

    }
    console.log(this.encuentro);
  }

  ngOnDestroy(): void {
    console.log("Destroy - edit partido");
    if (this.equiposInfo) {
      console.log('eqiposInfo estaba suscripto pero se destruyo');
      this.equiposInfo.unsubscribe();
      this.equiposInfo1.unsubscribe();

    }
  }
  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.encuentro.fecha = value;
    console.log(value);
  }



  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }


  async actualizarpuntos(uid1: string, uid2: string) {
    const path = 'Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'uid', '==', uid1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];

        if (this.encuentro.res_e1 == this.encuentro.res_e2) {
          console.log("empate" + this.encuentro.res_e1 + "-" + this.encuentro.res_e2)
          this.equipo1.puntos = this.equipo1.puntos + 1;
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_e = this.equipo1.p_e + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;


        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e1);
          this.equipo1.puntos = this.equipo1.puntos + 3;
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_g = this.equipo1.p_g + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;



        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e2);
          this.equipo1.p_j = this.equipo1.p_j + 1;
          this.equipo1.p_p = this.equipo1.p_p + 1;
          this.equipo1.g_f = this.equipo1.g_f + this.encuentro.res_e1;
          this.equipo1.g_c = this.equipo1.g_c + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;
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


        this.firestoreService.actualizarpartido(data, path, uid1);
        this.equipo1={
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
      }
        
        this.equiposInfo.unsubscribe();


      }
    }

    );

    this.equiposInfo1 = this.firestoreService.getgrupos<Equipos>(path, 'uid', '==', uid2).subscribe(res => {
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
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;

        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e1);

          this.equipo2.p_j = this.equipo2.p_j + 1;
          this.equipo2.p_p = this.equipo2.p_p + 1;
          this.equipo2.g_f = this.equipo2.g_f + this.encuentro.res_e2;
          this.equipo2.g_c = this.equipo2.g_c + this.encuentro.res_e1;
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;

        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          console.log("resultado: " + this.encuentro.res_e1 + "-" + this.encuentro.res_e2);
          console.log("Gano: " + this.encuentro.nombre_e2);
          this.equipo2.puntos = this.equipo2.puntos + 3;
          this.equipo2.p_j = this.equipo2.p_j + 1;
          this.equipo2.p_g = this.equipo2.p_g + 1;
          this.equipo2.g_f = this.equipo2.g_f + this.encuentro.res_e2;
          this.equipo2.g_c = this.equipo2.g_c + this.encuentro.res_e1;
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;

        }


        const data = {
          puntos: this.equipo2.puntos,
          p_j: this.equipo2.p_j,
          p_g: this.equipo2.p_g,
          p_e: this.equipo2.p_e,
          p_p: this.equipo2.p_p,
          g_f: this.equipo2.g_f,
          g_c: this.equipo2.g_c,
          d_g: this.equipo2.d_g
        }
        console.log(data)

        this.firestoreService.actualizarpartido(data, path, uid2);
        this.equipo2={
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
      }
        this.equiposInfo1.unsubscribe();
      }
    });
    // console.log(this.equipo1);
    // console.log(this.equipo2);


  }

  async saveMatch() {


    if (this.encuentro.estado == "iniciado" || this.encuentro.estado == "espera") {
      console.log("El partido ha iniciado");
      const path = 'Partidos';
      this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
        console.log('guardado con exito');

        this.encuentro = {
          uid: '',
          tipo: '',
          fechae: '',
          fecha: null,
          numero: 0,
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
        };
        this.presentLoading('Actualizando datos', 1500);
        setTimeout(() => {
          this.router.navigate(['/tab-campeonato/encuentros']);
        }, 1000);

      }).catch(error => {
        console.log(error)
      });

    } else if (this.encuentro.estado == "finalizado") {
      console.log("El partido ha finalizadoo");
      if (this.encuentro.tipo == "Fase de grupos") {
        await this.actualizarpuntos(this.encuentro.uid_e1, this.encuentro.uid_e2);
        const path = 'Partidos';
        this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
          console.log('guardado con exito');

          this.encuentro = {
            uid: '',
            tipo: '',
            fechae: '',
            fecha: null,
            numero: 0,
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
          };

          this.equipo1={
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
          }
          this.equipo2={
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
        }

          
          this.presentLoading('Guardando partido', 1500);
          // setTimeout(() => {
            this.router.navigate(['/tab-campeonato/encuentros']);
          // }, 1000);

        }).catch(error => {
          console.log(error)
        });

      } else {
        const path = 'Partidos';
        this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
        console.log('guardado con exito');
  
          this.encuentro = {
            uid: '',
            tipo: '',
            fechae: '',
            fecha: null,
            numero: 0,
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
          };
          this.presentLoading('Actualizando datos', 1500);
          // setTimeout(() => {
            this.router.navigate(['/tab-campeonato/encuentros']);
          // }, 1000);
  
        }).catch(error => {
          console.log(error)
        });

      }
    }
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




  async restart() {
    this.router.navigate(['tab-campeonato/encuentros'])

    this.encuentro = {
      uid: null,
      tipo: null,
      fechae: null,
      fecha: null,
      numero: 0,
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
