import { Injectable } from '@angular/core';
import {AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  constructor(public angularFirestore: AngularFirestore) { }

  

}
