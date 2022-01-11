import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent {

  constructor(public firebaseauthService: FirebaseauthService,
              public router:Router,
              private menuL: MenuController,
              public toastController: ToastController,
              public alertController: AlertController) { }

  ngOnInit() {

    this.menuL.enable(false);
  }


  reset(email){

        if(email.value==""){
          console.log("email vacio")
          this.presentAlert("Coloque el correo de su cuenta");
        }else{
          try {
            this.firebaseauthService.resetpassword(email.value);
            this.router.navigate(['/login']);
            this.presentToast("Correo enviado",1500)
          } catch (error) {
            console.log("Error =>",error)
          }
        }
    
  }

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
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
