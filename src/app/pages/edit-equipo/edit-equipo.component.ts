import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Equipos, Campeonatos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.scss'],
})
export class EditEquipoComponent implements OnInit {

  constructor(public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) { }


  newFoto: any;
  equipo: Equipos = {
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
  ngOnInit() {
    const team = this.firestoreService.getEquipo();
    if (team !== undefined) {
      this.equipo = team;
    }

    const campeonato = this.firestoreService.getCampeonato();
    if (campeonato !== undefined) {
      this.infocampeonato = campeonato;

    }
    console.log(this.infocampeonato);
  }

  async newImage(event: any) {

    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.newFoto = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.equipo.escudo = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }


  }

  async deleteTeam() {
    const path = "Equipos";
    this.firestoreService.deletepartido(path, this.equipo.uid).then(res => {
      this.presentLoading('Eliminando', 1500);
      setTimeout(() => {
        this.router.navigate(['/tab-campeonato/equipos']);
      }, 1000);
    }).catch(error => {
      console.log(error)
    });
  }


  async saveTeam() {

    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Equipos';
    const equipo = this.equipo.nombre;
    if (this.equipo.nombre == "" || this.equipo.grupo == null) {
      // this.presentAlert("Complete el nombre del equipo");
      this.presentToast("Complete todos los datos", 2000);

      console.log(this.equipo.nombre + " " + this.equipo.escudo);
    } else {
      if (this.newFoto !== undefined) {
        const res = await this.firestoreService.uploadImage(this.newFoto, path, equipo);
        this.equipo.escudo = res;
      } else {
        // this.presentAlert("Suba el escudo del equipo");
        // this.presentToast("Suba el escudo del equipo",2000);
      }
      this.firestoreService.createDoc(this.equipo, path, this.equipo.uid).then(res => {
        console.log('guardado con exito');
        this.presentLoading('Actualizando', 1500);
        setTimeout(() => {
          this.router.navigate(['/tab-newcampeonato/equipos1']);
        }, 1000);
        this.equipo = {
          uid: null,
          nombre: null,
          escudo: null,
          grupo: null,
          puntos: 0,
          p_j: 0,
          p_g: 0,
          p_e: 0,
          p_p: 0,
          g_f: 0,
          g_c: 0,
          d_g: 0
        };

      }).catch(error => {

      });


    }

  }

  async restart() {
    this.router.navigate(['tab-newcampeonato/equipos1'])
    this.equipo = {
      uid: null,
      nombre: null,
      escudo: null,
      grupo: null,
      puntos: null,
      p_j: null,
      p_g: null,
      p_e: null,
      p_p: null,
      g_f: null,
      g_c: null,
      d_g: null
    };

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
