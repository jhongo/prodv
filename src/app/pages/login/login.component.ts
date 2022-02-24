import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User, DataUser, Referencias } from 'src/app/models';
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

  datauser: DataUser = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    referencia: '',
  }

  referencias: Referencias []=[];
  uid = '';
  suscriberUserInfo: Subscription;
  login: boolean = false;
  refenciaInfo: Subscription;
  
  opcion= "";

  constructor(public firebaseauthService: FirebaseauthService,
    public fireStore: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private menuL: MenuController,
    public router: Router,
    public loadingCtrl: LoadingController
    ) {

      this.firebaseauthService.stateAuth().subscribe( res=>{
      if (res) {

        console.log('Esta logeado');
        this.login =true;
        this.presentLoading('Iniciando Sesión', 1500);
        setTimeout(() => {
        this.router.navigate(['/home']);
        this.menuL.enable(true);
        }, 1500);
        
      }else{
        console.log('No esta logeado')
        this.login = false;
        }
      })
     }

  ngOnInit() {

    this.menuL.enable(false);
    this.opcion="entrar";
    this.getReferencias();
  }

  async registro(email, password) {
    try {

      if(this.datauser.email==""||this.datauser.password==""||this.datauser.referencia==""){

        this.presentToast('Datos incompletos',4000);
        //this.presentAlert('Datos incompletos');
        console.log("Vacios los datos");
        
      }else{
      const user = await this.firebaseauthService.registrar(email.value, password.value);
      this.saveUser();
      this.presentToast('Cuenta creada con exito',4000);
      this.opcion="entrar";

      // this.router.navigate(['/login']);
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

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
    

  }

  async getReferencias() {
    const path = 'Referencias';
    this.refenciaInfo = this.fireStore.getTeam<Referencias>(path).subscribe(res => {
      this.referencias = res;
    });
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
