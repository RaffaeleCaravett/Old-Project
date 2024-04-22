import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-chat-con-utente',
  templateUrl: './chat-con-utente.component.html',
  styleUrls: ['./chat-con-utente.component.scss']
})
export class ChatConUtenteComponent implements OnInit{

arrayPerChat:any=[]
chatForm!:FormGroup
@Input()idUtente!:string
@Input()datiUtenteDaContattare!:any

utente:any
  idDaUsare: any;
constructor (private ss:ServiziService,private cdr:ChangeDetectorRef) {

}

ngOnInit(): void {
this.ss.getUsers().subscribe((data:any)=>{
  Object.keys(data).map((key0:any)=>{

if(data){
  this.utente=data[this.idUtente]
if(data[key0].email==this.datiUtenteDaContattare.email){
this.ss.prendiChat().subscribe((data:any)=>{
  if(data){
    Object.keys(data).map((key1)=>{
    if(data[key1].id1==this.idUtente&&data[key1].email2==this.datiUtenteDaContattare.email){
this.arrayPerChat.push(data[key1])
    }
else if (data[key1].id1==key0&&data[key1].email2==this.utente.email){

  this.idDaUsare=key0
  this.arrayPerChat.push(data[key1])
}
    })

  }

})
}
}

  })

})

this.chatForm=new FormGroup({
  messaggio:new FormControl(null, Validators.required)
})

}
prendiLeChats(){
  this.ss.prendiChat().subscribe((data:any)=>{
  if(data){
    this.arrayPerChat=Object.keys(data).map((key)=>{return data[key]})
  }

})
}

submitChat(){
  if(this.chatForm.controls['messaggio'].value!='' && this.chatForm.controls['messaggio'].value!=undefined)
  this.ss.creaChat('https://nuovoprogetto-fe8d2-default-rtdb.europe-west1.firebasedatabase.app/chats.json',
{id1:this.idUtente,
 email2:this.datiUtenteDaContattare.email,
 messaggio:this.chatForm.controls['messaggio'].value

}).subscribe((data:any)=>{

  this.chatForm.reset()
this.prendiLeChats()
})

}

}
