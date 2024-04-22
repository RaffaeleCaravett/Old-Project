import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-chat-con-utenti',
  templateUrl: './chat-con-utenti.component.html',
  styleUrls: ['./chat-con-utenti.component.scss']
})
export class ChatConUtentiComponent implements OnInit{
chatPersonale!:string
richieste!:boolean
requests:any=[]
@Input() idPerDatiUtente!:string
personeCheSegui:any=[]
  datiPerContatto: any;
  personeCheTiSeguono:any=[]
  arrayPerChat: any=[];
  @Input() user:any
  allUtenti:any=[]
  chats:any=[]
  personeCheNonTiSeguono: any=[];
  idCheSegui: any=[];
  idCheTiSeguono: any=[];
  @Input() color:string
  @Input() text:string
constructor(private ss:ServiziService,private cdr:ChangeDetectorRef,private spinner:NgxSpinnerService ){
}
  ngOnInit(): void {
    this.requests=[]
    this.richieste=false
this.ss.getRelazione().subscribe((data:any)=>{
  Object.keys(data).map(key=>{
    if(data[key].idCheSegue==this.user.id){
      this.idCheSegui.push(data[key])
    }else if(data[key].idSeguito==this.user.id){
this.idCheTiSeguono.push(data[key])

    }
  })
  this.ss.getUsers().subscribe((data:any)=>{
    Object.keys(data).map((key:any)=>{
      for(let e of this.idCheSegui){
         if(e.idSeguito!=undefined&&data[key].id==e.idSeguito){
          this.personeCheSegui.push(data[key])
         }
      }
      for(let id of this.idCheTiSeguono){
        if (id.idCheSegue!=undefined&&data[key].id==id.idCheSegue){
          this.personeCheTiSeguono.push(data[key])
        }
      }
    })
  })

  setTimeout(()=>{
    for(let personaCheSegui of this.personeCheSegui){
    for(let personaCheTiSegue of this.personeCheTiSeguono){
      if(personaCheSegui.id==personaCheTiSegue.id){
        let vari=this.personeCheTiSeguono.indexOf(personaCheTiSegue)
        this.personeCheTiSeguono.splice(vari,1)
      }
    }
  }

  this.requests=this.personeCheTiSeguono
  this.ss.prendiChat().subscribe((data:any)=>{
    Object.keys(data).map((key:any)=>{
      for(let r of this.requests){
         if(data[key].id1==r.id&&data[key].email2==this.user.email){
          this.arrayPerChat.push(r)
         }
        }
    })
    this.arrayPerChat=this.arrayPerChat.filter((value:any, index:any, array:any) => array.indexOf(value) === index);
    this.requests=this.arrayPerChat
  })
  this.cdr.markForCheck()
  },3000)
})
setTimeout(()=>{
this.spinner.hide()
},1000)
  }

goChatPersonale(a:any){
  this.chatPersonale='no'
this.datiPerContatto=a
setTimeout(() => {
  this.chatPersonale='yes'
}, 500);
}

}
