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
  
  usuarios: User={
    uid: '',
    email: '',
    displayName:'',
    emailVerified: null,
  };
  uid= '';
  suscriberUserInfo : Subscription;

  constructor(public firebaseauthService: FirebaseauthService,
    public fireStore: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private menuL: MenuController,
    public router: Router, ) { }

  ngOnInit() {

    this.menuL.enable(false);
  }

  async ingresar(email,password){
   
    await this.firebaseauthService.login(email.value, password.value).then( res=> {
      console.log('Ingreso con exito');
      // this.menuL.enable(true);
      this.router.navigate(['/main']);
      this.usuarios={
        uid: null,
        email: null,
        displayName:null,
        emailVerified:null,
      };
    }).catch( res=> {
      console.log('erros => ', res.message)
    })
  }

}
