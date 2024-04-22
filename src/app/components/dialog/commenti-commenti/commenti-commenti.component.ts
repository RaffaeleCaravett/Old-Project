import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';

@Component({
  selector: 'app-commenti-commenti',
  templateUrl: './commenti-commenti.component.html',
  styleUrls: ['./commenti-commenti.component.scss']
})
export class CommentiCommentiComponent {
  myForm: FormGroup;
  date= new Date();
  meseInLettere: string;
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
  public dialogRef: MatDialogRef<CommentiCommentiComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ss: ServiziService,
  private dialog:MatDialog
) {
  for (let commento of this.data[2]) {
    if (commento.idCommento == this.data[0].idQuestoCommento) {
      this.commentiArray.push(commento);
    }
  }
  this.cdr.markForCheck()
}
ngOnInit() {
  console.log(this.data)
this.myForm = new FormGroup({
      textareaField: new FormControl('', Validators.required)
    });
    if (this.date.getMonth() == 0) {
      this.meseInLettere = 'Gennaio';
    } else if (this.date.getMonth() == 1) {
      this.meseInLettere = 'Febbraio';
    } else if (this.date.getMonth() == 2) {
      this.meseInLettere = 'Marzo';
    } else if (this.date.getMonth() == 3) {
      this.meseInLettere = 'Aprile';
    } else if (this.date.getMonth() == 4) {
      this.meseInLettere = 'Maggio';
    } else if (this.date.getMonth() == 5) {
      this.meseInLettere = 'Giugno';
    } else if (this.date.getMonth() == 6) {
      this.meseInLettere = 'Luglio';
    } else if (this.date.getMonth() == 7) {
      this.meseInLettere = 'Agosto';
    } else if (this.date.getMonth() == 8) {
      this.meseInLettere = 'Settembre';
    } else if (this.date.getMonth() == 9) {
      this.meseInLettere = 'Ottobre';
    } else if (this.date.getMonth() == 10) {
      this.meseInLettere = 'Novembre';
    } else if (this.date.getMonth() == 11) {
      this.meseInLettere = 'Dicembre';
    }
    this.utente = this.data[1];
    this.likeSound = new Audio('../../../../assets/come-here-notification.ogg');

this.getIterations()
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.data[0].idQuestoCommento)
this.ss.insertCommentoCommentiAiCommenti(
  {
    idCommento: this.data[0].idQuestoCommento,
    nome: this.data[1].nome + ' ' + this.data[1].cognome,
    immagine:this.data[1].avatar,
    commento:this.myForm.controls['textareaField'].value,
    data: 'Il ' +
                  this.date.getDate() +
                  ' ' +
                  this.meseInLettere +
                  ' ' +
                  this.date.getFullYear() +
                  ' ' +
                  'alle' +
                  ' ' +
                  this.date.getHours() +
                  ':' +
                  this.date.getMinutes(),
                  storia:false
  }
).subscribe((data:any)=>{
  this.ss.modificaCommentoCommentoAlPost(data.name,{idQuestoCommento:data.name}).subscribe((
    dat:any
  )=>{
    this.dialogRef.close()
  })
})
    }
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
    // this.ss
    //   .insertIterazioniCommentiAiCommenti({
    //     utenteCheMetteLike: this.utente.id,
    //     postPiaciuto: a.idQuestoCommento,
    //     nomeUtente: this.utente.nome + ' ' + this.utente.cognome,
    //     avatar: this.utente.avatar,
    //     idUtenteCommento: a.id,
    //   })
    //   .subscribe((data: any) => {
    //     this.getIterations();
    //     this.realIterations = [];
    //     if (
    //       (a.id != this.utente.id)
    //     ) {
    //       this.ss
    //         .postNotifica({
    //           azione: 'interazione',
    //           da: [this.utente.avatar, this.utente.nome, this.utente.cognome],
    //           a: a.id ,
    //           idCommento: a.idQuestoCommento,
    //           titoloCommento: a.commento,
    //           immagineCommento: a.immagine,
    //         })
    //         .subscribe((data) => {});
    //     }
    //     for (let iterazione of this.iterazioni) {
    //       if (
    //         iterazione.postPiaciuto == a.idQuestoCommento &&
    //         iterazione.utenteCheMetteLike == this.utente.id
    //       ) {
    //         this.realIterations.push(iterazione);
    //       }
    //     }
    //     setTimeout(() => {
    //       this.perPerLikes++;
    //     }, 300);
    //   });
  }
  dislike(favorite: any) {
    // this.ss.getIterazioniCommentiAiCommenti().subscribe((data: any) => {
    //   Object.keys(data).map((key: any) => {
    //     if (
    //       data[key].utenteCheMetteLike == this.utente.id &&
    //       data[key].postPiaciuto == favorite.idQuestoCommento
    //     ) {
    //       this.ss.eliminaIterazioneAiComm(key).subscribe((data: any) => {
    //         this.getIterations();
    //         this.realIterations = [];
    //         for (let iterazione of this.iterazioni) {
    //           if (iterazione.postPiaciuto == favorite.idQuestoCommento) {
    //             this.realIterations.push(iterazione);
    //           }
    //         }
    //       });
    //     }
    //   });
    //   setTimeout(() => {
    //     this.perPerLikes = this.perPerLikes - 1;
    //     this.isItLiked = false;
    //   }, 300);
    // });
  }
  getIterations() {
  //   this.iterazioni = [];
  //   this.ss.getIterazioniCommentiAiCommenti().subscribe((data: any) => {
  //     if (data) {
  //       this.iterazioni = Object.keys(data).map((key) => {
  //         return data[key];
  //       });
  //     }
  //   });
  }
  goCheckIterations(a: any) {
  //   const dialogRef = this.dialog.open(DialogForIterationsComponent, {
  //     data: [a, this.utente, this.utente.id],
  //     width: '600px',
  //     height: '600px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result != undefined) {
  //       this.dialogRef.close(result);
  //     }
  //   });
  }
}
