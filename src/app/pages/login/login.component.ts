import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
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
    public router: Router, ) { }

  ngOnInit() {}

  async ingresar(){
    const credenciales ={
      email: this.usuarios.email,
      password: this.usuarios.password,
    }
    await this.firebaseauthService.login(credenciales.email, credenciales.password).then( res=> {
      console.log('Ingreso con exito');
      this.router.navigate(['/main']);
      this.usuarios={
        uid: null,
        usuario: null,
        email: null,
        movil: null,
        password: null,
        confirm_password: null
      };
    }).catch( res=> {
      console.log('erros => ', res.message)
    })
  }

}
