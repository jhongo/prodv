import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataUser } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Subscription } from 'rxjs';
// import { clearScreenDown } from 'readline';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Referencia, Referencias, User } from '../../models';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.page.html',
  styleUrls: ['./page-profile.page.scss'],
})
export class PageProfilePage implements OnInit {

  adminA=false;
  admin= false;
  referente=false;
  num=0;
  userAll=0;
  usersinrefe=0;
  opcion= '';
  dataUpdate = false;
  activeData = false;
  usuario: User = {
    uid: '',
    email:'',
    displayName:'',
    emailVerified:null,
  };

  datauser: DataUser = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    referencia: '',
  };

  refeadmin: Referencia []=[];
  refe: Referencia={
    nombre:'',
    correo:'',
    total: 0,
    uid: ''
  };
  //variables para login
  referenciast: Referencias []=[];
  refenciaInfo: Subscription;
  usuarios: User = {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: null,
  };

  uid= '';
  suscriberUserInfo: Subscription;
  constructor(public firestoreService: FirestoreService,
    public firebaseauth: FirebaseauthService,
    public menuLateral: MenuController,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,) {
      this.firebaseauth.stateAuth().subscribe(res =>{
        if(res!=null){
          this.uid = res.uid;
          console.log(this.uid);
          this.infoUser(this.uid);
          this.activeData = false;
        }else{
          console.log(this.uid);
          this.initClient();
          this.activeData = true;
        }

      });

      this.firebaseauth.stateAuth().subscribe(res =>{
        if(res!=null){
          if (res.uid=='LikZN15qNiQi1pFEAT8frapWt243'||res.uid=='sYOl5vJntAWPUoDMoBZsrd05KAu1'||res.uid=='meSq5AahaXWo6ZYSkwSw0TJtt6f1'){
            this.adminA = true;
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

  async ngOnInit() {
    const uid  = await this.firebaseauth.getUid();
    console.log(uid);
    this.menuLateral.enable(true);
    //codigo de login y registro
    this.opcion='entrar';
    this.getReferencias();
    console.log(this.activeData);
  }

///codigo para publicidad






  initializeApp(){
    this.getUid();
  }
  getUserInfo(uid: string ){
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<User>(path, uid).subscribe(res =>{
      this.usuario = res ;
    });
  }
  async initClient(){
    this.uid='';
    this.datauser = {
      uid: '',
      email: '',
      celular: '',
      password: '',
      referencia: '',
    };
  }

  toggleTheme(event){
    console.log(event);
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark');
    }else{
      document.body.setAttribute('color-theme','light');
    }
  }

  async guardarUser() {
    const path = 'Usuarios';
    const name = this.datauser.celular;
    const referencia= this.datauser.referencia;
    // if(this.newFoto!== undefined){
    //   const res= await this.firestorageService.uploadImage(this.newFoto, path, name);
    //   this.socios.foto= res;
    // }
      this.firestoreService.createDoc(this.datauser, path, this.datauser.uid ). then(res=> {
      console.log('guardado con exito');
      // this.presentLoading('Guardando',1000);
      this.datauser = { 
        uid: null,
        email: null,
        celular: null,
        password: null,
        referencia: null,

      };
      this.dataUpdate=false;
    }).catch( error =>{
    });
  }

  async infoUser(uid: string ){
    const path= 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<DataUser>(path, uid).subscribe(res =>{
      this.datauser = res ;
      console.log(this.datauser.email);
      this.validar(this.datauser.email);
    });
  }

  validar(email: string){
    console.log('Emai: '+email);

    if(email == 'jefematute27@gmail.com'){
      this.admin=true;
      this.referente=false;
      this.referencias(email);
      this.getreferencias();
      // console.log("admin");
      // this.usuariorefe("Todo Deportes");
      // this.usuariorefe("Ruth");
      // this.usuariorefe("Chontillo");
      // this.usuariorefe("Miguel");
      // this.usuariorefe("La Tertulia");
      // this.usuariorefe("");
      this.getAllUser();
    }else{
      this.admin=false;
      this.referente=false;
      this.referencias(email);

      // console.log("user");
    }

  }

  referencias(correo: string){
    const path= 'Referencias';
    this.firestoreService.getrefencias<Referencia>(path,'correo','==', correo).subscribe(res =>{
      if(res.length){
        this.refe=res[0];
        this.referente=true;
        // console.log("Si hay referencia");
        // console.log(res);
        // console.log(this.refe)

        // this.usuariorefe(this.refe.nombre)
      }else{
        // console.log("No hay referencia");
      }
    });
  }

  usuariorefe(referencia: string){
    const path ='Usuarios';
    this.firestoreService.getusersrefe<DataUser>(path,'referencia','==', referencia).subscribe(res =>{
      console.log(referencia+ ' num: '+res.length);
      if(referencia==''){

        this.usersinrefe=res.length;
      }
      this.num=res.length;
    });
  }

  getreferencias(){
    const path = "Referencias";
    this.firestoreService.getrefegene<Referencia>(path).subscribe(res =>{
      this.refeadmin=res;
      
    });
  }

  getAllUser(){
    const path = 'Usuarios';
    this.firestoreService.getrefegene<DataUser>(path).subscribe(res =>{
      this.userAll=res.length;
    });
  }

  async presentLoading(mensaje: string, tiempo: number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  }

  async salir(){
    console.log('salir salir');
    this.firebaseauth.logout();
    this.usuario = {
      uid: null,
      email:null,
      displayName:null,
      emailVerified:null,
    };
    this.initClient();
    await this.suscriberUserInfo.unsubscribe();
    this.presentLoading('Cerrando Sesión',1000);
    setTimeout(() => {
      this.router.navigate(['/page-main-menu/local']);
    this.menuLateral.enable(true);
    }, 1000);
  }

  getUid(){
    this.firebaseauth.stateAuth().subscribe(res =>{
      if(res!=null){
        if (res.uid== 'LikZN15qNiQi1pFEAT8frapWt243'|| res.uid=='sYOl5vJntAWPUoDMoBZsrd05KAu1'|| res.uid== 'meSq5AahaXWo6ZYSkwSw0TJtt6f1') {
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



  //Codigo para login y registro


  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }

  async getReferencias() {
    const path = 'Referencias';
    this.refenciaInfo = this.firestoreService.getTeam<Referencias>(path).subscribe(res => {
      this.referenciast = res;
    });
  }

  async registro(email, password) {
    try {

      if(this.datauser.email==""||this.datauser.password==""){
        this.presentToast('Datos incompletos',4000);
        //this.presentAlert('Datos incompletos');
        console.log('Vacios los datos');
      }else{
      const user = await this.firebaseauth.registrar(email.value, password.value);
      this.consultarrefe(this.datauser.referencia);
      this.saveUser();
      this.presentToast('Cuenta creada con exito',4000);
      this.opcion='entrar';

      // this.router.navigate(['/login']);
      console.log('Registrado');
      if (user) {
        console.log('User ->', user);
      }

      }

    } catch (error) {
      console.log('Error', error);

    }
  }

  async saveUser() {
    const uid = await this.firebaseauth.getUid();
    this.datauser.uid = uid;
    const path = 'Usuarios';
    this.firestoreService.createDoc(this.datauser, path, this.datauser.uid).then(res => {
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

  consultarrefe(referencia: string){
    const path= 'Referencias';
    this.refenciaInfo= this.firestoreService.getrefencias<Referencia>(path,'nombre','==', referencia).subscribe(res =>{
      this.refe=res[0];
      console.log('Referencia '+this.refe.total);
      this.refe.total=this.refe.total+1;
      this.firestoreService.actualizarrefe(this.refe,path,this.refe.uid);
      this.refenciaInfo.unsubscribe();
      this.refe = {
        correo:'',
        nombre:'',
        total:0,
        uid:''
      };
    });
  }


  async ingresar(email, password) {

    await this.firebaseauth.login(email.value, password.value).then(res => {
      console.log('Ingreso con exito');
      this.presentLoading('Iniciando Sesión', 1500);
      setTimeout(() => {
        this.router.navigate(['/page-main-menu/local']);
        this.menuLateral.enable(true);
      }, 1000);
      this.usuarios = {
        uid: null,
        email: null,
        displayName: null,
        emailVerified: null,
      };
      email.value='';
      password.value='';
    }).catch(res => {
      console.log('error => ', res.message);
      this.presentAlert('Verifique sus datos');
    });
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
