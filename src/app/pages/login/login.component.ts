import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuarios: User = {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: null,
  };
  uid = '';
  suscriberUserInfo: Subscription;

  constructor(public firebaseauthService: FirebaseauthService,
    public fireStore: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private menuL: MenuController,
    public router: Router,) { }

  ngOnInit() {

    this.menuL.enable(false);
  }

  async ingresar(email, password) {

    await this.firebaseauthService.login(email.value, password.value).then(res => {
      console.log('Ingreso con exito');
      this.presentLoading('Iniciando Sesión', 1500);
      setTimeout(() => {
        this.router.navigate(['/home']);
        this.menuL.enable(true);
      }, 1000); 
      this.usuarios = {
        uid: null,
        email: null,
        displayName: null,
        emailVerified: null,
      };
      email.value="";
      password.value="";
    }).catch(res => {
      console.log('error => ', res.message)
      this.presentAlert("Verifique sus datos");
    })
  }

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo
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
