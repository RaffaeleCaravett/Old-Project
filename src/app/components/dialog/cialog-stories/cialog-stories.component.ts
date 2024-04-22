import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';


@Component({
  selector: 'app-cialog-stories',
  templateUrl: './cialog-stories.component.html',
  styleUrls: ['./cialog-stories.component.scss']
})
export class CialogStoriesComponent {
variableImg!:any
cialogForm!:FormGroup
images:any
imageIndex:any
public isEmojiPickerVisible!: boolean;
public comment: string = '';
  value: any;

public addEmoji(event: { emoji: { native: any; }; }) {
  this.comment = `${this.comment}${event.emoji.native}`;
  this.isEmojiPickerVisible = false;
}
showEmoji:boolean=false
  constructor(private cdr:ChangeDetectorRef, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


cialogSubmit(){
this.data={
  titolo:this.cialogForm.controls['textA'].value,
  file:this.variableImg
}
this.dialogRef.close(this.data);

}
ngOnInit(): void {
this.value=''
this.cialogForm=new FormGroup({
  textA:new FormControl(),
  file:new FormControl()
})

}


viewFileValue(a:any){
  if (a.target.files && a.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.variableImg = (<FileReader>event.target).result;
        this.cdr.detectChanges()
    }

    reader.readAsDataURL(a.target.files[0]);
  }

}
onUpdateCialogFormValue(event:any){
  if(event.length<=2){
    this.cialogForm.controls['textA'].setValue(this.cialogForm.controls['textA'].value==null?event:this.cialogForm.controls['textA'].value+event)
  }else if(event.length>2){
    this.cialogForm.controls['textA'].setValue( this.cialogForm.controls['textA'].value.substring(0, this.cialogForm.controls['textA'].value.lastIndexOf(" ")+1||
    this.cialogForm.controls['textA'].value.lastIndexOf(this.cialogForm.controls['textA'].value.length)) + event)
  }

}
sendValue(){
  this.value=this.cialogForm.controls['textA'].value
  this.cdr.markForCheck()
}

}



