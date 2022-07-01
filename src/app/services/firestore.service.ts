import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import { Equipos, Encuentro, EncuentroPrueba, Campeonatos} from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public FireStore: AngularFirestore,
              public storage: AngularFireStorage) { }

  editEquipo: Equipos;
  editMatch : EncuentroPrueba;
  editCampeonato: Campeonatos;

  createDoc<tipo>(data: tipo, enlace:string, id:string){
    const ref = this.FireStore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getCollectiongrupos<tipo>(path: string,  parametro: string, condicion: any, busqueda: string, fecha:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",fecha).where("estado","==", "espera")
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getCollectiongruposfinalizados<tipo>(path: string,  parametro: string, condicion: any, busqueda: string, fecha:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",fecha).where("estado","==", "finalizado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getgruposinit<tipo>(path: string,  parametro: string, condicion: any, busqueda: string, fecha:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",fecha).where("estado","==", "iniciado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getCollection<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "espera") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getgrupos<tipo>(path: string,  parametro: string, condicion: any, busqueda: string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda) 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getCollectionfinalizados<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "finalizado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }

  getpartidos_init<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "iniciado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  getCollectionGru<tipo>(path: string,  parametro: string, condicion: any, busqueda: string){
    
    const collection= this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).orderBy('puntos','desc').orderBy('d_g','desc').orderBy('nombre'));
    return collection.valueChanges();
  }

  getPartidos<tipo>(path: string){
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.orderBy('fecha','desc'),
      );
    return collection.valueChanges();
  }

  // getcampeonatosprueba(path:string,id: string){

  //   const collection = this.FireStore.collection(path,
  //     ref => ref.orderBy('fecha','desc'),
  //   );
  //     return collection.doc(id).valueChanges();
  // }
  // getcampeonatospruebasinuid(path:string){

  //   const collection = this.FireStore.collection(path,
  //     ref => ref.orderBy('fecha','desc'),
  //   );
  //     return collection.valueChanges();
  // }

  getDoc<tipo>(path: string, id: string){
    const collection = this.FireStore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  getrefencias<tipo>(path:string, parametro: string, condicion: any, busqueda: string){
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda)
      // .orderBy('fecha','desc')
      // // .startAt(date)s
      );
    return collection.valueChanges();
  }

  getrefegene<tipo>(path:string){
    const collection = this.FireStore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getusersrefe<tipo>(path:string,parametro: string, condicion: any, busqueda: string){
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda)
      // .orderBy('fecha','desc')
      // // .startAt(date)s
      );
    return collection.valueChanges();
  }


  actualizarpartido(data:any, path :string, id:string){
    const collection= this.FireStore.collection(path);
    return collection.doc(id).update(data);

  }
  actualizarrefe(data:any, path:string, id:string){
    const collection= this.FireStore.collection(path);
    return collection.doc(id).update(data);
  }

  deletepartido(path:string,id:string){
    const collection = this.FireStore.collection(path);
    return collection.doc(id).delete();
  }
  
  getId(){
    return this.FireStore.createId();
  } 

  getTeam<tipo>(path: string){
    const collection = this.FireStore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getTeamfecha<tipo>(path:string){
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where('estado','==','iniciado').orderBy('fecha','desc'),);
    return collection.valueChanges();
  }
  getTeamsind<tipo>(path: string,  parametro: string, condicion: any, busqueda: string){
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda) 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
  }
  

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          })
        })


      )
        .subscribe();

    })


  }

  setEquipo(equipo: Equipos){ 
    this.editEquipo = equipo;
  }  
  getEquipo(){
    return this.editEquipo;
  } 

  setCampeonato(campeonato: Campeonatos){
    this.editCampeonato= campeonato;
  }
  
  getCampeonato(){
    return this.editCampeonato;
  }

  setMatch(match:EncuentroPrueba){
    return this.editMatch=match;

  }




  getMatch(){
    return this.editMatch;
  } 


  get_partidos_ida_vuel_E<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "espera") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  get_partidos_ida_vuel_Init<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "iniciado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }
  get_partidos_ida_vuel_Fina<tipo>(path: string,  parametro: string, condicion: any, busqueda: string,encuentro:string){
    const date = new Date();
    const collection = this.FireStore.collection<tipo>(path,
      ref => ref.where(parametro,condicion,busqueda).where("fechae","==",encuentro).where("estado","==", "finalizado") 
      // .orderBy('fecha','desc')
      // // .startAt(date)
      );
    return collection.valueChanges();
  }

}
