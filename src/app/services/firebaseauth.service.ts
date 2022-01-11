import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) {}

  login(email: string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    this.auth.signOut();
  }
   async resetpassword(email:string): Promise<void>{
    try {
      return this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log("Error=>",error)
    }


   }

  

  // registrar(email: string, password:string){
  //  return this.auth.createUserWithEmailAndPassword(email,password);
  // }

  async registrar(email: string, password: string): Promise<User> {
    try {
      const {user}= await this.auth.createUserWithEmailAndPassword(email,password);
      await this.verificacion();
      return user;
      
    } catch (error) {
      console.log("Error ->", error);
    }

  }

  async verificacion(): Promise<void> { 
    try {
      return (await this.auth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log("Error ->", error);
    }
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if (user == null) {
      return null;
    }else{
      return user.uid;
    }
  }

  stateAuth(){
    return this.auth.authState;
  }

}
