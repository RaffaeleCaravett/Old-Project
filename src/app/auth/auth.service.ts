import { Injectable } from '@angular/core';
import { User } from '../components/Modelli/users.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn=false
  user!:User
  signUpUrl='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjt9NYA0d0nc7cRQZ29kcBlsFeM3trwfQ'
  signInUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjt9NYA0d0nc7cRQZ29kcBlsFeM3trwfQ'
  constructor(private http:HttpClient) { }

isAuthenticated(){
  return this.isLoggedIn
}
createUser(  email:string,id:string,token:string,expirationDate:Date){
  this.user = new User(email,id,token,expirationDate)
}

signUp(body:{}){
  return this.http.post(this.signUpUrl,body)
 }

signIn(body:{}){
  return this.http.post(this.signInUrl,body)
 }

}
