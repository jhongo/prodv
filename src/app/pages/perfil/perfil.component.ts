import { Component, OnInit } from '@angular/core';
import { DataUser } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from "../../services/firebaseauth.service";
import { Subscription } from 'rxjs';
// import { clearScreenDown } from 'readline';
import { Referencia, Referencias } from '../../models';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  admin= false;
  referente=false;
  num=0;
  UserAll=0;
  Usersinrefe=0;

  DataUpdate = false;
  activeData = false;


  datauser: DataUser = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    referencia: '',
  }

  refeadmin: Referencia []=[];

  refe : Referencia={
    nombre:'',
    correo:'',
    total: 0,
    uid: ''
  }


  uid= '';
  suscriberUserInfo : Subscription;
  constructor(public firestoreService: FirestoreService,
              public firebaseauth: FirebaseauthService,
              public menuLateral: MenuController,
              ) {
                this.firebaseauth.stateAuth().subscribe(res =>{
                  if(res!=null){
                    this.uid = res.uid;
                    this.InfoUser(this.uid);
                    this.activeData = false;
                  }else{
                    
                    this.initClient();
                    this.activeData = true;

                  }

                });
              }

  async ngOnInit() {
    const uid  = await this.firebaseauth.getUid();
    console.log(uid);
    this.menuLateral.enable(true);
    
  }
  initClient(){  
    this.uid='';
    this.datauser = { 
      uid: '',
      email: '',
      celular: '',
      password: '',
      referencia: '',
    };
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
      this.DataUpdate=false;
    }).catch( error =>{
    });
  }

  InfoUser(uid:string ){
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<DataUser>(path, uid).subscribe(res =>{
      this.datauser = res ;
      console.log(this.datauser.email);
      this.validar(this.datauser.email);
    });
  }

  validar(email:string){
    console.log("Emai: "+email);

    if(email=="jefematute27@gmail.com"){
      this.admin=true;
      this.referente=false;
      this.referencias(email);
      this.getreferencias();
      // console.log("admin");
      this.usuariorefe("Todo Deportes");
      this.usuariorefe("Ruth");
      this.usuariorefe("Chontillo");
      this.usuariorefe("Miguel");
      this.usuariorefe("La Tertulia");
      this.usuariorefe("");
      this.getAllUser();



    }else{
      this.admin=false;
      this.referente=false;
      this.referencias(email);

      // console.log("user");
    }

  }

  referencias(correo:string){
    const path= "Referencias"
    this.firestoreService.getrefencias<Referencia>(path,"correo","==", correo).subscribe(res =>{
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

  usuariorefe(referencia:string){
    const path ="Usuarios";
    this.firestoreService.getusersrefe<DataUser>(path,"referencia","==", referencia).subscribe(res =>{
      console.log(referencia+ " num: "+res.length);
      if(referencia==""){

        this.Usersinrefe=res.length;
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
    const path = "Usuarios";
    this.firestoreService.getrefegene<DataUser>(path).subscribe(res =>{
      this.UserAll=res.length;
    });
  }


}
