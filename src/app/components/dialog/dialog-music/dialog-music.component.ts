import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-dialog-music',
  templateUrl: './dialog-music.component.html',
  styleUrls: ['./dialog-music.component.scss']
})
export class DialogMusicComponent implements OnInit {
  songs: any=[]
  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiziService

  ) {}
  ngOnInit(): void {
   this.songs=this.data
  }


}
