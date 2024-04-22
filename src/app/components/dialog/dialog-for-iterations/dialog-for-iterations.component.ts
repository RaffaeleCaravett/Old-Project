import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { OnHoverDialogComponent } from '../on-hover-dialog/on-hover-dialog.component';

@Component({
  selector: 'app-dialog-for-iterations',
  templateUrl: './dialog-for-iterations.component.html',
  styleUrls: ['./dialog-for-iterations.component.scss']
})
export class DialogForIterationsComponent implements OnInit {
  nonSeguirePiu!: boolean;
  arrayToUseInHtml:any = []
  arrayToUseInHtml1:any =[]
  relazioni:any=[]
  showButtons!: boolean;
  dial!: boolean;
  arrayCommenti: any=[];
  thisD:any
  atClose:any
  constructor( public dialogRef: MatDialogRef<any>,
    public thisDialog : MatDialogRef<DialogForIterationsComponent>,
    public dialogRef1: MatDialogRef<OnHoverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService,
    private cdr:ChangeDetectorRef,
    private dialog:MatDialog
  ) {
this.thisD=thisDialog
    for (let el of this.data[0]){
      this.arrayToUseInHtml.push(el)
   }
  }

  onNoClick(a:any): void {
    this.dialogRef.close(a);
  }
  onNoClick1(a:any): void {
    this.dialogRef.close(a);
  }
ngOnInit(): void {
  this.dial=false
this.showButtons=false
this.getRelationships()
}

segui(a:any){
  if(!a.seguito){
this.ss.creaRelazione({
  idCheSegue:this.data[1].id,
  idSeguito:a.utenteCheMetteLike
}).subscribe((data:any)=>{
this.getRelationships()
this.cdr.markForCheck()
  })
  }
  else{
this.ss.getRelazione().subscribe((data:any)=>{
  Object.keys(data).map((key:any)=>{
if(data[key].idCheSegue==this.data[1].id && data[key].idSeguito==a.utenteCheMetteLike){
   this.ss.eliminaRelazione(key).subscribe((data:any)=>{
    const index= this.arrayToUseInHtml.indexOf(a)
    this.arrayToUseInHtml[index]={
      avatar
      :
      a.avatar,
      postPiaciuto
      :
      a.postPiaciuto,
      utenteCheMetteLike
      :
      a.utenteCheMetteLike,
      nomeUtente
      :
      a.nomeUtente
    }
    this.getRelationships()
    this.cdr.markForCheck()
    })
}
  })
})
  }
}

getRelationships(){
this.ss.getRelazione().subscribe((data:any)=>{
if(data){
  Object.keys(data).map((key:any)=>{
  for(let el of this.arrayToUseInHtml){
const index= this.arrayToUseInHtml.indexOf(el)
     if(data[key].idCheSegue==this.data[1].id && data[key].idSeguito==el.utenteCheMetteLike){
      el=
      {avatar
      :
      el.avatar,
      postPiaciuto
      :
      el.postPiaciuto,
      utenteCheMetteLike
      :
      el.utenteCheMetteLike,
      nomeUtente
      :
      el.nomeUtente,
      seguito
      :
      true    }
  this.arrayToUseInHtml[index]=el
}
this.showButtons=true
  this.cdr.markForCheck()
  }
})
}
})
}

tryToOpenThisDialog(evt: MouseEvent,b:any){
  if(this.dial==false){
this.dial=true
if(b.id){
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.dialog.open(OnHoverDialogComponent, {
      data: { trigger: target ,data:b}, hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe( _res => {
      this.dial=false
      if(_res){
        this.atClose=_res
        this.thisD.close(this.atClose)
      }
    });
  }else if(b.utenteCheMetteLike){
this.ss.prendiCommento().subscribe((data:any)=>{
  Object.keys(data).map(key=>{
    if(data[key].id && data[key].id==b.utenteCheMetteLike){
   this.arrayCommenti.push(data[key])
    }else if(data[key].idDiChiCondivide && data[key].idDiChiCondivide==b.utenteCheMetteLike){
      this.arrayCommenti.push(data[key])
    }
  })
if(this.arrayCommenti){
  const target = new ElementRef(evt.currentTarget);
  const dialogRef = this.dialog.open(OnHoverDialogComponent, {
      data: { trigger: target ,data:this.arrayCommenti[0]||b}, hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe( _res => {
      this.arrayCommenti=[]
      this.dial=false
      if(_res){
        this.atClose=_res
        this.thisD.close(this.atClose)
      }
    });
  }
})
}
}
  }

catch(a:any){
  if(this.dial==true){
 this.dialogRef1.close()
  this.dial=false
  }
}
}
