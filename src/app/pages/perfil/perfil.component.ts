import { Component, OnInit } from '@angular/core';
import { DataUser } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from "../../services/firebaseauth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  
  DataUpdate = false;
  datauser: DataUser = {
    uid: '',
    email: '',
    name: '',
    password: '',
    referencia: '',
  }
  uid= '';
  suscriberUserInfo : Subscription;
  constructor(public firestoreService: FirestoreService,
              public firebaseauth: FirebaseauthService) {
                this.firebaseauth.stateAuth().subscribe(res =>{
                  if(res!=null){
                    this.uid = res.uid;
                    this.InfoUser(this.uid);
                  }else{
                    
                    this.initClient();

                  }

                });
              }

  async ngOnInit() {
    const uid  = await this.firebaseauth.getUid();
    console.log(uid);
  }
  initClient(){  
    this.uid='';
    this.datauser = { 
      uid: '',
      email: '',
      name: '',
      password: '',
      referencia: '',
    };
   }

  async guardarUser() {
    const path = 'Usuarios';
    const name = this.datauser.name;
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
        name: null,
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
    });
  }
}
