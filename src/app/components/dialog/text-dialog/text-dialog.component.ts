import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.scss']
})
export class TextDialogComponent implements OnInit {


  text:string
  fontSize:string='12'
  forClose: any=[];
  changeWidth:boolean=false
  constructor( public dialogRef: MatDialogRef<TextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService
  ) {}
  ngOnInit(): void {
    if(this.data!=null&&this.data!=''&&this.data!=undefined){
 this.text=this.data
    }
  }

closeDialog(input?:any,size?:any,color?:any){
  this.forClose=[input,size,color]
this.dialogRef.close(this.forClose)
}

selectedColor: string = '#000000';

  colorChanged(color: string) {
    this.selectedColor = color;
  }
  setWidth(){
 if(this.changeWidth==true){
  this.dialogRef.updateSize('800px','700px');
 }else {
  this.dialogRef.updateSize('300px','300px');
 }
    }
}
