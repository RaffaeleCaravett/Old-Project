import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-dialog-to-view-who-vies-stories',
  templateUrl: './dialog-to-view-who-vies-stories.component.html',
  styleUrls: ['./dialog-to-view-who-vies-stories.component.scss']
})
export class DialogToViewWhoViesStoriesComponent {

constructor(public dialogRef: MatDialogRef<any>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ss:ServiziService
) {}

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data)

}

}
