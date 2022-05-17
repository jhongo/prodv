import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {



  login: boolean = false;

  constructor(
    public firebaseauthService: FirebaseauthService,
    public fireStore: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public menuL: MenuController,
    public router: Router,
    public loadingCtrl: LoadingController,
  ) { 

    // this.firebaseauthService.stateAuth().subscribe( res=>{
    //   if (res) {

    //     console.log('Esta logeado');
    //     this.login =true;
    //     this.presentLoading('Iniciando Sesión', 1500);
    //     setTimeout(() => {
    //     this.router.navigate(['/home']);
    //     this.menuL.enable(true);
    //     }, 1500);
        
    //   }else{
    //     console.log('No esta logeado')
    //     this.login = false;
    //     this.presentLoading('Espere...', 1500);
    //     setTimeout(() => {
    //     this.router.navigate(['/home']);
    //     this.menuL.enable(true);
    //     }, 1500);
    //     }
    //   })

    this.presentLoading('', 500);
      setTimeout( () => {
        this.router.navigate(['home']);
        this.menuL.enable(true);
      }, 1500);

    }

  ngOnInit() {
    this.menuL.enable(false);
   
  }




  async presentLoading(mensaje: string, tiempo: number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  }


  }
