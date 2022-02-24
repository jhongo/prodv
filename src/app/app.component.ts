import { Component } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from './services/firestore.service';
import { User } from './models';
import { Subscription } from 'rxjs';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  admin = false;

  usuario: User = { 
    uid: '',
    email:'',
    displayName:'',
    emailVerified:null,
  };

  uid='';
  suscriberUserInfo : Subscription;
  
  constructor(  public firebaseauthService: FirebaseauthService,
                public loadingController: LoadingController,
                public firestoreService: FirestoreService,
                public router:Router,
                private menuL: MenuController,
                private platform: Platform,
                ){

      this.firebaseauthService.stateAuth().subscribe(res =>{
        if(res!=null){

          if (res.uid == 'LikZN15qNiQi1pFEAT8frapWt243' || res.uid == 'sYOl5vJntAWPUoDMoBZsrd05KAu1' ) {
            this.admin = true;
            this.getUserInfo(res.uid);
          }else{
            this.admin = false;
            this.getUserInfo(res.uid);
          }
        }else{
          this.admin = false;
          this.initClient();

        }

      });


    }

    initializeApp(){
      this.getUid();
    }

    initClient(){  
      this.uid='';
      this.usuario = { 
        uid: '',
        email:'',
        displayName:'',
      emailVerified:null,
      };
  
     }

    getUserInfo(uid:string ){
      const path = 'Usuarios';
      this.suscriberUserInfo= this.firestoreService.getDoc<User>(path, uid).subscribe(res =>{
        this.usuario = res ;
      });
    }

  async Salir() {

    console.log("salir salir salir");
    this.firebaseauthService.logout();
    this.usuario = { 
      uid: null,
      email:null,
      displayName:null,
      emailVerified:null,
    };
    await this.suscriberUserInfo.unsubscribe();

    this.presentLoading('Cerrando Sesión',1000);
    setTimeout(() => {
      this.router.navigate(['/login']);
    this.menuL.enable(false);
    }, 1000);
 
  }


  async presentLoading(mensaje:string, tiempo:number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  } 
  getUid(){
  
    this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res!=null){
  
        if (res.uid == 'LikZN15qNiQi1pFEAT8frapWt243' || res.uid == 'sYOl5vJntAWPUoDMoBZsrd05KAu1' ) {
          this.admin = true;
          this.getUserInfo(res.uid);
        }else{
          this.admin = false;
          this.getUserInfo(res.uid);
        }
      }else{
        this.admin = false;
        this.initClient();
  
      }
  
    });
  }


}



