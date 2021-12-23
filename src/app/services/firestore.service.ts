import { Injectable } from '@angular/core';
import {AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public FireStore: AngularFirestore) { }

  createDoc<tipo>(data: tipo, enlace:string, id:string){
    const ref = this.FireStore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string){
    const collection = this.FireStore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

}
