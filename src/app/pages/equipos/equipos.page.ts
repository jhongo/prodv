import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Equipos } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {

  estado = false;
  newFoto: any;
  equipoInfo: Subscription;
  team: Equipos[]=[];

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
  constructor(public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {

    this.getEquipos();
  }

  async saveTeam() {

    const path = 'Equipos';
    const equipo = this.equipo.nombre;
    if (this.equipo.nombre == "") {
      // this.presentAlert("Complete el nombre del equipo");
      this.presentToast("Complete el nombre del equipo",2000);
    } else {
      if (this.newFoto !== undefined) {
        this.equipo.uid = this.firestoreService.getId();
        const res = await this.firestoreService.uploadImage(this.newFoto, path, equipo);
        this.equipo.escudo = res;
        this.firestoreService.createDoc(this.equipo, path, this.equipo.uid).then(res => {
          console.log('guardado con exito');
          this.presentLoading('Guardando', 1000); 
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
          this.estado = false;
        }).catch(error => {

        });
      } else {
        // this.presentAlert("Suba el escudo del equipo");
      this.presentToast("Suba el escudo del equipo",2000);


      }

    }

  }

  async getEquipos(){
    const path = 'Equipos'; 
    this.equipoInfo = this.firestoreService.getTeam<Equipos>(path).subscribe(res =>{
      this.team = res;
    });
  } 

  async getEquipo(equipo:Equipos){
    console.log('Click en getEquipo'); 
    console.log(equipo);
    this.firestoreService.setEquipo(equipo); 

  }

  async restart(){

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
