import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogToViewWhoViesStoriesComponent } from '../dialog-to-view-who-vies-stories/dialog-to-view-who-vies-stories.component';

@Component({
  selector: 'app-dialog-to-view-stories',
  templateUrl: './dialog-to-view-stories.component.html',
  styleUrls: ['./dialog-to-view-stories.component.scss']
})
export class DialogToViewStoriesComponent {

  count!:number
  arrayStorieViste: any=[]
  utentiCheHannoVistoQuestaStoria:any=[]
  utentiCheHannoVistoStoriesFinal:any
  openDialog!:boolean
  arrayUtenti: any=[]
  arrayKeys:any=[]
  storieVisteDiQuestoUtente:any=[]
  nonAggiungereVisualizzazione: number=0;
  constructor(
    public dialog: MatDialog,public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService,
    private cdr:ChangeDetectorRef
  ) {
    this.openDialog=false
  this.count=0
  this.arrayStorieViste=[]
  this.arrayStorieViste.push({storia: this.data.data[this.count].id , di: this.data.data[this.count].email,chiVede:this.data.idDiChiVisita})
  }
ngOnInit(): void {
this.ss.getStorieViste().subscribe((data:any)=>{
    if(data){
Object.keys(data).map((key:any)=>{
if(data[key].chiVede==this.data.idDiChiVisita&&data[key].storia==this.data.data[this.count].id){
this.nonAggiungereVisualizzazione=1
}
})
}
this.riceviStoriesEViews()
})

}
  riceviStoriesEViews(){
    if(this.nonAggiungereVisualizzazione==0){
    this.ss.getStorieViste().subscribe((data:any)=>{
      this.ss.postStorieViste('https://nuovoprogetto-fe8d2-default-rtdb.europe-west1.firebasedatabase.app/storieViste.json',this.arrayStorieViste[0]).
      subscribe((dati:any)=>{
        this.ss.getStorieViste().subscribe((data:any)=>{
          Object.keys(data).map((key:any)=>{
            if(data[key].di==this.data.data[this.count].email && data[key].storia == this.data.data[this.count].id){
          this.ss.getUsers().subscribe((datas:any)=>{
           if(datas){
             Object.keys(datas).map((keyss:any)=>{
               this.utentiCheHannoVistoQuestaStoria.push(datas[data[key].chiVede])
               this.utentiCheHannoVistoQuestaStoria=Array.from(this.utentiCheHannoVistoQuestaStoria.reduce((m:any, t:any) => m.set(t.id, t), new Map()).values());
              this.cdr.markForCheck()
              })
  }
    })
    }
     })
  })})
  })
}else{
      this.ss.getStorieViste().subscribe((data:any)=>{
        Object.keys(data).map((key:any)=>{
          if(data[key].di==this.data.data[this.count].email && data[key].storia == this.data.data[this.count].id){
        this.ss.getUsers().subscribe((datas:any)=>{
         if(datas){
           Object.keys(datas).map((keyss:any)=>{
             this.utentiCheHannoVistoQuestaStoria.push(datas[data[key].chiVede])
             this.utentiCheHannoVistoQuestaStoria=Array.from(this.utentiCheHannoVistoQuestaStoria.reduce((m:any, t:any) => m.set(t.id, t), new Map()).values());
             this.cdr.markForCheck()
   })
}
  })
  }
   })
})
}

this.nonAggiungereVisualizzazione=0
     this.cdr.markForCheck()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
countLess(){
if(this.count!=0){
  this.arrayStorieViste=[]
  this.utentiCheHannoVistoStoriesFinal=[]
  this.utentiCheHannoVistoQuestaStoria=[]
  this.count--
  this.arrayStorieViste.push({storia: this.data.data[this.count].id , di: this.data.data[this.count].email,chiVede:this.data.idDiChiVisita})
  this.ngOnInit()
  this.cdr.detectChanges()
}
}

countMore(){
  if(this.count!=this.data.data.length-1){
    this.arrayStorieViste=[]
    this.utentiCheHannoVistoStoriesFinal=[]
    this.utentiCheHannoVistoQuestaStoria=[]
    this.count++
    this.arrayStorieViste.push({storia: this.data.data[this.count].id , di: this.data.data[this.count].email,chiVede:this.data.idDiChiVisita})
    this.ngOnInit()
    this.cdr.detectChanges()
  }
}

openDialoggg(){
const dialogRef = this.dialog.open(DialogToViewWhoViesStoriesComponent,{
  data:this.utentiCheHannoVistoQuestaStoria,
  height: '500px',
  width: '400px',
  autoFocus: false
})
dialogRef.afterClosed().subscribe((result:any)=>{
  console.log(result)
})
}


}
