import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { DataUser } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingController, ToastController, MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuarios: User = {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: null,
  };

  datauser: DataUser = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    referencia: '',
  }
  uid = '';
  suscriberUserInfo: Subscription;


  constructor(public firebaseauthService: FirebaseauthService,
    public fireStore: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router,
  ) { }

  ngOnInit() { }

  initUser() {
    this.uid = '';
    this.usuarios = {
      uid: '',
      email: '',
      displayName: '',
      emailVerified: false,
    }
  }
  async registro(email, password) {
    try {

      if(this.datauser.email==""||this.datauser.celular==""||this.datauser.password==""||this.datauser.referencia==""){

        this.presentToast('Datos incompletos',4000);
        //this.presentAlert('Datos incompletos');
        console.log("Vacios los datos");
        
      }else{
      const user = await this.firebaseauthService.registrar(email.value, password.value);
      this.saveUser();
      this.presentToast('Cuenta creada con exito',4000);
      this.router.navigate(['/login']);
      console.log('Registrado');
      if (user) {
        console.log('User ->', user);
      }

      }

    } catch (error) {
      console.log("Error", error);

    }
  }

  
  async saveUser() {
    const uid = await this.firebaseauthService.getUid();
    this.datauser.uid = uid;
    const path = 'Usuarios';
    this.fireStore.createDoc(this.datauser, path, this.datauser.uid).then(res => {
      console.log('Guardado con exito');
      this.datauser = {
        uid: null,
        email: null,
        celular: null,
        password: null,
        referencia: null,
      };
    }).catch(res => {
      console.log('err=> ', res.message);
      
    });

  }

  getUserInfo(uid: string) {
    const path = 'Usuarios';
    this.suscriberUserInfo = this.fireStore.getDoc<User>(path, uid).subscribe(res => {
      this.usuarios = res;
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
      buttons: ['OK']
    });

    await alert.present();
  }

}
