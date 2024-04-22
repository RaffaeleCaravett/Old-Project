import { Component, ElementRef, EventEmitter, HostListener, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-on-hover-dialog',
  templateUrl: './on-hover-dialog.component.html',
  styleUrls: ['./on-hover-dialog.component.scss']
})
export class OnHoverDialogComponent {
  user:any
  dialay:any
  toClose:any
  private readonly _matDialogRef: MatDialogRef<OnHoverDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  data:any
  postsArray:any=[]
  @Output() profile = new EventEmitter<string>()
  @Output() idKeyDaVisitare = new EventEmitter<string>()
  @Output() idKeyDiChiVisita = new EventEmitter<string>()
  @Output() visit = new EventEmitter<string>()
  close:boolean=false

  constructor(_matDialogRef: MatDialogRef<OnHoverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef ,user:any,posts:any,dati:any[]},
    private ss:ServiziService) {
    this._matDialogRef = _matDialogRef;
    this.toClose=_matDialogRef;
    this.triggerElementRef = data.trigger;
    this.data=data.dati
    this.user=data.user
    this.postsArray=data.posts
    if(this.postsArray&&this.postsArray.length>3){
      this.postsArray.length=3
    }
  }
  ngOnInit() {
    this.dialay = this._matDialogRef
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '450px';
    matDialogConfig.height = '600px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left}px`, top: `${rect.bottom -400}px` };
    this._matDialogRef.updatePosition(matDialogConfig.position);


    setTimeout(()=>{
if(this.close==false){
  this.cancel()
}
    },1000)
  }
  cancel(): void {
    this._matDialogRef.close(null);
  }
}
