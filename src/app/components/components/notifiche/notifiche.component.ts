import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {
  @Input()notificheDaLeggere!: number;
  @Input()notifiche:any=[]
  @Input()notificheLette:any=[]
  @Input()utente: any;
  @Input() bg:string
  @Input() text:string

constructor(private servizi:ServiziService){

}


ngOnInit(): void {
  this.servizi.getNotifiche().subscribe((data:any)=>{
    if(data){
      this.notifiche=[]
      this.notificheLette=[]
      Object.keys(data).map((key:any)=>{
    if(data[key].a==this.utente.id){
      this.notifiche.push(data[key])
      if(data[key].letta&&data[key].letta==true){
       this.notificheLette.push(data[key])
      }else{
        this.notificheLette.push(data[key])
        this.servizi.modificaNotifica(key,{letta:true}).subscribe((data:any)=>{
       })
     }
    }
  })
    }

  this.notificheDaLeggere=this.notifiche.length-this.notificheLette.length
  })
}

}
