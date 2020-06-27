import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fauth: AngularFireAuth) { }
  loginFirebase(email: string, password: string){
    return new Promise<any>((resolve, reject) => {
      this.fauth.signInWithEmailAndPassword(email, password)
      .then(res => {       
     
      resolve(res);
      // this.Sharing.isUserLoggedIn.next(true);
      }, err => reject(err))
    })
    
  }

  logout(){
    return new Promise<any>((resolve,reject)=>{
      if (this.fauth.currentUser){
      //if (this.fauth.auth.currentUser){
  
      this.fauth.signOut();
      resolve("log out");
      }else{
      reject();
      }
  
    })
  }
}
