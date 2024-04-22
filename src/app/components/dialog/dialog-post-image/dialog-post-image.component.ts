import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogMusicComponent } from '../dialog-music/dialog-music.component';
import { TextDialogComponent } from '../text-dialog/text-dialog.component';


@Component({
  selector: 'app-dialog-post-image',
  templateUrl: './dialog-post-image.component.html',
  styleUrls: ['./dialog-post-image.component.scss'],

})

export class DialogPostImageComponent implements OnInit  {
@ViewChild('myDiv') myDiv
musics:any
value:any
variableImg!:string
utente:any
showEmoji:boolean=false
sound:any
@ViewChild('title') title
@ViewChildren('audioElement')
audioElements: QueryList<ElementRef<HTMLAudioElement>>;
  res: any;
  text:any
  fontSize: any;
  color: any;
  positionValues: number[]=[20,20];
  constructor(
  private cdr: ChangeDetectorRef,
  public dialogRef: MatDialogRef<DialogPostImageComponent>,
  private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private renderer: Renderer2
){
  this.variableImg=this.data[1]
  this.utente=this.data[0]
   this.musics=this.data[2]
}
ngAfterViewInit() {
  this.dialogRef.updateSize('600px', '695px');
}


  ngOnInit(): void {
    this.value=''
    this.cdr.markForCheck()
    this.draggableStyle['left'] = '0px';
    this.draggableStyle['top'] = '0px';
  }
  sendValue(){
    this.value=this.title.nativeElement.value
    this.cdr.markForCheck()
  }
onNoClick(){
  this.dialogRef.close()
}
close(a:any,b:any,c?:any,d?:any){
this.dialogRef.close([a,b,c,d])
}
onUpdateCialogFormValue(event:any){
  if(event.length<=2){
    this.title.nativeElement.value=this.title.nativeElement.value+event
  }else if(event.length>2){
    this.title.nativeElement.value= this.title.nativeElement.value.substring(0, this.title.nativeElement.value.lastIndexOf(" ")+1||this.title.nativeElement.value.lastIndexOf(this.title.nativeElement.value.length)) + event
  }

  }

playM(audio:any){
  audio.play()
}
choseAudio(){
const dialogRef = this.dialog.open(DialogMusicComponent,{
  width:'400px',
  height:'400px',
  data:this.musics
})
dialogRef.afterClosed().subscribe(result=>{
this.res=result
})
}
dragging: boolean = false;
dragStartX: number = 0;
dragStartY: number = 0;
draggableStyle: { [key: string]: string } = {};



dragStart(event: MouseEvent) {
  event.preventDefault();
  this.dragging = true;
  this.dragStartX = event.clientX - parseInt(this.draggableStyle['left'].replace('px', ''))
  this.dragStartY = event.clientY - parseInt(this.draggableStyle['top'].replace('px', ''))
}
dragMove(event: MouseEvent) {
  event.preventDefault();
  if (this.dragging) {
    const parentRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const draggableRect = (event.target as HTMLElement).getBoundingClientRect();

    const offsetX = event.clientX - this.dragStartX;
    const offsetY = event.clientY - this.dragStartY;

    const maxX = parentRect.width - draggableRect.width;
    const maxY = parentRect.height - draggableRect.height;

    const x = Math.max(0, Math.min(maxX, offsetX));
    const y = Math.max(0, Math.min(maxY, offsetY));

    this.draggableStyle['left'] = `${x}px`;
    this.draggableStyle['top'] = `${y}px`;
    this.positionValues=[x,y]
  }
}

dragEnd(event: MouseEvent) {
  event.preventDefault();
  this.dragging = false;
}
openTextDialog(){
  const dialogRef = this.dialog.open(TextDialogComponent,{
    width:'300px',
    height:'300px',
    data:this.text||null
  })
  dialogRef.afterClosed().subscribe((data:any)=>{
    console.log(data[2])
    this.text=data[0]||' '
    this.fontSize=data[1]||'12px'
    this.color=data[2]||'black'
  })
}

}
// <!-- <div class="d-flex"> -->
// <div class="parent" (mousedown)="dragStart($event)" (mousemove)="dragMove($event)" (mouseup)="dragEnd($event)">
// <img
// src="{{ variableImg }}"
// alt="Immagine caricata"
// class="immagine-postata rounded border"
// />
// <div class="draggable bg-primary" [ngStyle]="draggableStyle"  [ngStyle]="{'font-size':fontSize}">
// {{text||''}}
// </div>
// </div>
// <!-- <div><i class="material-icons" (click)="openTextDialog()">text_fields</i></div>
// </div>
// </div> -->
// .parent {
//   position: relative;
//   width: 450px;
//   height: 450px;
// }
// .draggable {
//   position: absolute;
//   width: 100px;
//   height: 100px;
//   cursor: move;
// }
