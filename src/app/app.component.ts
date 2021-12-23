import { Component } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from './services/firestore.service';
import { Usuario } from './models';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario: Usuario = { 
    uid: '',
    usuario: '',
    email:'',
    movil: '',
    confirm_password: '',
    password: '', 
  };

  uid='';
  suscriberUserInfo : Subscription;
  
  constructor(public firebaseauthService: FirebaseauthService,
    public loadingController: LoadingController,
    public firestoreService: FirestoreService,
    public router:Router,
    private menuL: MenuController) {

      this.firebaseauthService.stateAuth().subscribe(res =>{
        if(res!=null){
          this.uid = res.uid;
          this.getUserInfo(this.uid);
        }else{
          
          this.initClient();

        }

      });


    }

    initClient(){  
      this.uid='';
      this.usuario = { 
        uid: '',
        usuario: '',
        email:'',
        movil: '',
        confirm_password: '',
        password: '',  
      };
  
     }

    getUserInfo(uid:string ){
      const path = 'Usuarios';
      this.suscriberUserInfo= this.firestoreService.getDoc<Usuario>(path, uid).subscribe(res =>{
        this.usuario = res ;
      });
    }

  async Salir() {

    console.log("salir salir salir");
    this.firebaseauthService.logout();
    this.usuario = { 
      uid: null,
      usuario: null,
      email:null,
      movil: null,
      confirm_password: null,
      password: null, 
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


}


