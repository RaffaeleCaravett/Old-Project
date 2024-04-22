import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { firebaseApp } from 'src/app/shared-stuff/firebase-config';

@Component({
  selector: 'app-father-of-all',
  templateUrl: './father-of-all.component.html',
  styleUrls: ['./father-of-all.component.scss']
})
export class FatherOfAllComponent implements OnInit {
  utente:any
  notifiche: any=[];
  notificheLette: any=[];
  notificheDaLeggere!: number;
  data:Date = new Date
  meseInLettere!:string
  songs: any=[];

constructor(private cdr:ChangeDetectorRef,private servizi:ServiziService,private http:HttpClient,private sanitization:DomSanitizer){
  this.utente = {
    avatar: localStorage.getItem('avatar'),
    email: localStorage.getItem('email'),
    dataDiNascita: localStorage.getItem('dataDiNascita'),
    luogoDiNascita: localStorage.getItem('luogoDiNascita'),
    interessi: localStorage.getItem('interessi'),
    stato: localStorage.getItem('stato'),
    sesso: localStorage.getItem('sesso'),
    isOnline: localStorage.getItem('isOnline'),
    id: localStorage.getItem('id'),
    nome: localStorage.getItem('nome'),
    cognome: localStorage.getItem('cognome'),
  };
}
visit:string=''
string:string=''
savedIdForSeach:string=''
savedIdOfWhoVisit:string=''
cercaInDrawerContent!:boolean
urlXImgNav:string=''
color:string='bg-light'
text:string='text-dark'
ngOnInit():void{
this.string='Home'
this.notificheLette=[]
this.notifiche=[]
this.servizi.getNotifiche().subscribe((data:any)=>{
  if(data){
    Object.keys(data).map((key:any)=>{
  if(data[key].a==this.utente.id){
    this.notifiche.push(data[key])
    if(data[key].letta&&data[key].letta==true){
     this.notificheLette.push(data[key])
    }
  }
})
  }

this.notificheDaLeggere=this.notifiche.length-this.notificheLette.length
})
if (this.data.getMonth() == 0) {
  this.meseInLettere = 'Gennaio';
} else if (this.data.getMonth() == 1) {
  this.meseInLettere = 'Febbraio';
} else if (this.data.getMonth() == 2) {
  this.meseInLettere = 'Marzo';
} else if (this.data.getMonth() == 3) {
  this.meseInLettere = 'Aprile';
} else if (this.data.getMonth() == 4) {
  this.meseInLettere = 'Maggio';
} else if (this.data.getMonth() == 5) {
  this.meseInLettere = 'Giugno';
} else if (this.data.getMonth() == 6) {
  this.meseInLettere = 'Luglio';
} else if (this.data.getMonth() == 7) {
  this.meseInLettere = 'Agosto';
} else if (this.data.getMonth() == 8) {
  this.meseInLettere = 'Settembre';
} else if (this.data.getMonth() == 9) {
  this.meseInLettere = 'Ottobre';
} else if (this.data.getMonth() == 10) {
  this.meseInLettere = 'Novembre';
} else if (this.data.getMonth() == 11) {
  this.meseInLettere = 'Dicembre';
}
this.getAllAudios()
  }
  getAllAudios() {
    const storageRef = firebaseApp.storage().ref();
    const audioRef = storageRef.child('audio');

    audioRef.listAll()
      .then((result) => {
        result.items.forEach((audioItem) => {
          audioItem.getDownloadURL()
            .then((url) => {
             this.songs.push({sound:url,name:audioItem.name})
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error retrieving audio files:', error);
      });
  }
receiveurlPerImmagineNavbar(a:string){
this.urlXImgNav=a
}

receiveIdKeyDaVisitare(a:any){
  this.savedIdForSeach=a

  this.cdr.markForCheck()
}

receiveIdKeyDiChiVisita(a:any){
  this.savedIdOfWhoVisit=a
  this.cdr.markForCheck()
}
onReceiveVisit(a:any){
  this.visit=a
}
changeString(a:any){
    this.string= ' '
   setTimeout(()=>{
    this.string=a
this.notificheLette=[]
this.notifiche=[]
this.servizi.getNotifiche().subscribe((data:any)=>{
  if(data){
    this.notifiche=[]
    this.notificheLette=[]
    Object.keys(data).map((key:any)=>{
  if(data[key].a==this.utente.id){
    this.notifiche.push(data[key])
    if(data[key].letta&&data[key].letta==true){
     this.notificheLette.push(data[key])}
    }
  })
    }

  this.notificheDaLeggere=this.notifiche.length-this.notificheLette.length
  })
   },300)
}

changeCercaInDrawerContent(){
  this.cercaInDrawerContent=true
  setTimeout(()=>{
    this.cercaInDrawerContent=false
  this.cdr.detectChanges()
  },300)
}

receiveColor(event:any){
  this.color=event
  if(event=='bg-dark'){
    this.text='text-white'
  }else{
    this.text='text-dark'
  }
}

}
