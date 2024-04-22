import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService

  ) {}

  onNoClick(a:any): void {
    this.dialogRef.close(a);
  }
  onNoClick1(a:any): void {
    this.dialogRef.close(a);
  }
ngOnInit(): void {
  this.data.title=' '
}



}
