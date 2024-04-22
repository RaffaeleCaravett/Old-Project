import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { Dynamics } from 'src/app/shared-stuff/Dynamic-sizes';
import { CommentiCommentiComponent } from '../commenti-commenti/commenti-commenti.component';
import { DialogCommentiComponent } from '../dialog-commenti/dialog-commenti.component';
import { DialogForIterationsComponent } from '../dialog-for-iterations/dialog-for-iterations.component';

@Component({
  selector: 'app-show-comm-comm-ai-commenti',
  templateUrl: './show-comm-comm-ai-commenti.component.html',
  styleUrls: ['./show-comm-comm-ai-commenti.component.scss']
})
export class ShowCommCommAiCommentiComponent {
  commentiArray: any = [];
  utente: any;
  public isEmojiPickerVisible!: boolean;
  public comment: string = '';
  spinner:boolean = false
  showEmoji:boolean=false
  realIterations: any=[];
  iterazioni: any=[];
  isItLiked: boolean;
  perLikes: number;
  perPerLikes: number;
  likeSound: HTMLAudioElement;
constructor(
  private cdr: ChangeDetectorRef,
  public dialogRef: MatDialogRef<DialogCommentiComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ss: ServiziService,
  private dialog:MatDialog
) {
  for (let commento of this.data[1]) {
    if (commento.idCommento == this.data[0].idQuestoCommento) {
      this.commentiArray.push(commento);
    }
  }
  this.cdr.markForCheck()
}

ngOnInit() {
  this.likeSound = new Audio('../../../../assets/come-here-notification.ogg');
  this.utente = this.data[2];
this.getIterations()
}


  showLikes(a: any) {
    this.realIterations = [];
    if (this.iterazioni.length > 0) {
      for (let iterazione of this.iterazioni) {
        if (iterazione.postPiaciuto == a.idQuestoCommento) {
          this.realIterations.push(iterazione);
          if (iterazione.utenteCheMetteLike == this.utente.id) {
            this.isItLiked = true;
          }
          this.perLikes = this.realIterations.length;
          this.perPerLikes = this.perLikes;
        }
      }
    } else {
      this.realIterations = [];
      this.perLikes = this.realIterations.length;
      this.perPerLikes = this.perLikes;
    }
  }
  hideLikes() {
    this.perPerLikes = 0;
    this.isItLiked = false;
    this.realIterations = [];
    this.cdr.detectChanges();
  }
  like(a: any) {
    this.ss
      .insertIterazioniCommentiAiCommenti({
        utenteCheMetteLike: this.utente.id,
        postPiaciuto: a.idQuestoCommento,
        nomeUtente: this.utente.nome + ' ' + this.utente.cognome,
        avatar: this.utente.avatar,
        idUtenteCommento: a.id,
      })
      .subscribe((data: any) => {
        this.getIterations();
        this.realIterations = [];
        if (
          (a.id != this.utente.id)
        ) {
          this.ss
            .postNotifica({
              azione: 'interazione',
              da: [this.utente.avatar, this.utente.nome, this.utente.cognome],
              a: a.id ,
              idCommento: a.idQuestoCommento,
              titoloCommento: a.commento,
              immagineCommento: a.immagine,
            })
            .subscribe((data) => {});
        }
        for (let iterazione of this.iterazioni) {
          if (
            iterazione.postPiaciuto == a.idQuestoCommento &&
            iterazione.utenteCheMetteLike == this.utente.id
          ) {
            this.realIterations.push(iterazione);
          }
        }
        setTimeout(() => {
          this.perPerLikes++;
        }, 300);
      });
  }
  dislike(favorite: any) {
    this.ss.getIterazioniCommentiAiCommenti().subscribe((data: any) => {
      Object.keys(data).map((key: any) => {
        if (
          data[key].utenteCheMetteLike == this.utente.id &&
          data[key].postPiaciuto == favorite.idQuestoCommento
        ) {
          this.ss.eliminaIterazioneAiComm(key).subscribe((data: any) => {
            this.getIterations();
            this.realIterations = [];
            for (let iterazione of this.iterazioni) {
              if (iterazione.postPiaciuto == favorite.idQuestoCommento) {
                this.realIterations.push(iterazione);
              }
            }
          });
        }
      });
      setTimeout(() => {
        this.perPerLikes = this.perPerLikes - 1;
        this.isItLiked = false;
      }, 300);
    });
  }
  getIterations() {
    this.iterazioni = [];
    this.ss.getIterazioniCommentiAiCommenti().subscribe((data: any) => {
      if (data) {
        this.iterazioni = Object.keys(data).map((key) => {
          return data[key];
        });
      }
    });
  }
  goCheckIterations(a: any) {
    const dialogRef = this.dialog.open(DialogForIterationsComponent, {
      data: [a, this.utente, this.utente.id],
      width: '600px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.dialogRef.close(result);
      }
    });
  }
  openCommentiCommenti(commento:any){
const dialogRef = this.dialog.open(CommentiCommentiComponent,
{
  width:Dynamics.width600,
  height:Dynamics.height600,
  data:[commento,this.utente]
})

this.dialogRef.afterClosed().subscribe((data:any)=>{
})
  }
}
