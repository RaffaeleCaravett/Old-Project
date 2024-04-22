import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiziService {

  urlComments='https://nuovoprogetto-fe8d2-default-rtdb.europe-west1.firebasedatabase.app/commenti.json'



  private user= environment.API_KEY+'persone.json'
  private modificaUser=environment.API_KEY+'persone'
  private prendiIterazioni= environment.API_KEY+'iterazioni.json'
  private commentiAiCommenti= environment.API_KEY+'commentiAiCommenti.json'
  private prendiRelazioni= environment.API_KEY+'relazioni.json'
  private commento= environment.API_KEY+'commenti.json'
  private modificaCommenti= environment.API_KEY+'commenti'
  private stories= environment.API_KEY+'stories.json'
  private storia= environment.API_KEY+'stories'
  private toDeleteStories= environment.API_KEY+'stories'
  private iterazioni = environment.API_KEY+'iterazioni.json'
  private relazioni= environment.API_KEY+'relazioni.json'
  private toDeleteRelazioni= environment.API_KEY+'relazioni'
  private modificaIterazioni = environment.API_KEY+'iterazioni'
  private postPostLiked = environment.API_KEY+'postPiaciuti.json'
  private deletePostLiked = environment.API_KEY+'postPiaciuti'
  private prendiChats = environment.API_KEY+'chats.json'
  private storiesViste = environment.API_KEY+'storieViste.json'
  private eliminaStoriesViste = environment.API_KEY+'storieViste'
  private postVisitors = environment.API_KEY+'visitors.json'
  private notifiche = environment.API_KEY+'notifiche.json'
  private notificheLette = environment.API_KEY+'notificheLette.json'
  private modifyNotifiche = environment.API_KEY+'notifiche/'
  private modifyCommentoPost = environment.API_KEY+'commentiAiCommenti/'
  private getAudios = environment.API_KEY+'musica.json'
  private InterazioniCommentiAiCommenti = environment.API_KEY+'intCommAiComm.json'
  private deleteInterazioniCommentiAiCommenti = environment.API_KEY+'intCommAiComm'
  private CommentoCommentiAiCommenti = environment.API_KEY+'CommCommAiComm.json'
  private deleteCommentoCommentiAiCommenti = environment.API_KEY+'CommCommAiComm'
  constructor(private http:HttpClient,private at:AuthService) { }

  insertUser(body:{}){
   return this.http.post(this.user,body)
  }
  logUser(){
  }
  isOnlineUser(url:string,id:any,body:{}){
      return this.http.patch(url+'/'+id+'.json',body)
    }
  insertCommento(body:{}){
    return this.http.post(this.commento,body)
  }
  insertCommentoAlPost(body:{}){
    return this.http.post(this.commentiAiCommenti,body)
  }
  modificaCommento(id:any,body:{}){
    return this.http.patch(this.modificaCommenti+'/'+id+'.json',body)
  }
  insertIterazioni(body:{}){
    return this.http.post(this.iterazioni,body)
  }
getIterazioni(){
return this.http.get(this.prendiIterazioni)
}
prendiCommento(){
  return this.http.get(this.commento)
}
eliminaCommento(id:any){
  return this.http.delete(this.modificaCommenti+'/'+id+'.json')
}
eliminaCommentoAlPost(id:any){
  return this.http.delete(this.modifyCommentoPost+id+'.json')
}
prendiCommentoalPost(){
  return this.http.get(this.commentiAiCommenti)
}
  getUser(){
    return this.http.get(`${this.user}=auth=${this.at.user.token}`)
  }
  getUsers(){
    return this.http.get(this.user)
  }
creaRelazione(body:{}){
return this.http.post(this.relazioni,body)
}
getRelazione(){
  return this.http.get(this.prendiRelazioni)
}
eliminaRelazione(id:any){
  return this.http.delete(this.toDeleteRelazioni+'/'+id+'.json')
}
creaChat(url:string,body:{}){
  return this.http.post(url,body)
}
prendiChat(){
return this.http.get(this.prendiChats)
}
aggiungiStoria(body:{}){
  return this.http.post(this.stories,body)
}
getAllStories(){
  return this.http.get(this.stories)
}
eliminaStoria(id:any){
  return this.http.delete(this.toDeleteStories+'/'+id+'.json')
}
postStorieViste(url:string,body:{}){
  return this.http.post(url,body)
}
getStorieViste(){
  return this.http.get(this.storiesViste)
}
eliminaStorieViste(id:string){
  return this.http.delete(this.eliminaStoriesViste+'/'+id+'.json')
}
modificaStoria(id:any,body:{}){
  return this.http.patch(this.storia+'/'+id+'.json',body)
}
modificaIterazione(id:any,body:{}){
  return this.http.patch(this.modificaIterazioni+'/'+id+'.json',body)
}
eliminaIterazione(id:any,){
  return this.http.delete(`${this.modificaIterazioni}/${id}.json`)
}
postPostPiaciuti(body:{}){
  return this.http.post(this.postPostLiked,body)
}
deletePostPiaciuti(id:string){
  return this.http.delete(this.deletePostLiked+'/'+id+'.json')
}
modifyUser(id:any,body:{}){
  return this.http.patch(this.modificaUser+'/'+id+'.json',body)
}
postVisitatori(body:{}){
return this.http.post(this.postVisitors,body)
}
getVisitatori(){
  return this.http.get(this.postVisitors)
}
postNotifica(body:{}){
return this.http.post(this.notifiche,body)
}
getNotifiche(){
  return this.http.get(this.notifiche)
}
postNotificaLetta(body:{}){
  return this.http.post(this.notificheLette,body)
}
getNotificheLette(){
  return this.http.get(this.notificheLette)
}
modificaNotifica(id:string,body:{}){
  return this.http.patch(this.modifyNotifiche+id+'.json',body)
}
modificaCommentoAlPost(id:any,body:{}){
return this.http.patch(this.modifyCommentoPost+id+'.json',body)
}
getMusica(){
  return this.http.get(this.getAudios)
}
getIterazioniCommentiAiCommenti(){
  return this.http.get(this.InterazioniCommentiAiCommenti)
}
insertIterazioniCommentiAiCommenti(body:{}){
  return this.http.post(this.InterazioniCommentiAiCommenti,body)
}
eliminaIterazioneAiComm(id:any,){
  return this.http.delete(`${this.deleteInterazioniCommentiAiCommenti}/${id}.json`)
}
getCommentoCommentiAiCommenti(){
  return this.http.get(this.CommentoCommentiAiCommenti)
}
insertCommentoCommentiAiCommenti(body:{}){
  return this.http.post(this.CommentoCommentiAiCommenti,body)
}
eliminaCommentoAiComm(id:any,){
  return this.http.delete(`${this.deleteCommentoCommentiAiCommenti}/${id}.json`)
}
modificaCommentoCommentoAlPost(id:any,body:{}){
  return this.http.patch(this.deleteCommentoCommentiAiCommenti+'/'+id+'.json',body)
  }
prendiCommCommentiAiCommenti(){
  return this.http.get(this.CommentoCommentiAiCommenti)
}
}
