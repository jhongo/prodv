import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingController, ToastController, MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuarios: Usuario={
    uid: '',
    usuario: '',
    email: '',
    movil: '',
    password: '',
    confirm_password:'',
  };
  uid= '';
  suscriberUserInfo : Subscription;


  constructor(public firebaseauthService: FirebaseauthService,
              public fireStore: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              ) { }

  ngOnInit() {}

  initUser(){
    this.uid='';
    this.usuarios={
      uid:'',
      usuario:'',
      email:'',
      movil:'',
      password:'',
      confirm_password:'',
    }
  }

  async registrarse(){
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password,
    };
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).then(res =>{

      this.saveUser();
      console.log('Registrado')
      
    }).catch( err=>{
      console.log('error=> ', err.message);
    });

    console.log('res => ',res);
  }

  async saveUser(){
    const uid = await this.firebaseauthService.getUid();
    this.usuarios.uid = uid;
    const path = 'Usuarios';
    const username = this.usuarios.usuario;
    const cel = this.usuarios.movil;
    this.fireStore.createDoc(this.usuarios, path, this.usuarios.uid).then(res =>{
      console.log('Guardado con exito');
      this.usuarios={
        uid: null,
        usuario: null,
        email: null,
        movil: null,
        password: null,
        confirm_password: null
      };
    }).catch( res =>{
      console.log('err=> ', res.message);

    })

  }

  getUserInfo(uid: string){
    const path = 'Usuarios';
    this.suscriberUserInfo = this.fireStore.getDoc<Usuario>(path, uid).subscribe(res =>{
      this.usuarios = res;
    })
  }


  async presentToast(mensaje:string, tiempo:number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }

  async presentLoading(mensaje:string, tiempo:number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  } 
  
  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
