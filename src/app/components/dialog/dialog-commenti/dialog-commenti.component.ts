import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.component';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogForIterationsComponent } from '../dialog-for-iterations/dialog-for-iterations.component';
import { CommentiCommentiComponent } from '../commenti-commenti/commenti-commenti.component';
import { Dynamics } from '../../../shared-stuff/Dynamic-sizes'


@Component({
  selector: 'app-dialog-commenti',
  templateUrl: './dialog-commenti.component.html',
  styleUrls: ['./dialog-commenti.component.scss'],
})
export class DialogCommentiComponent implements OnInit {
  commentiArray: any = [];
  utente: any;
  commentSound!: HTMLAudioElement;
  commentaForm!: FormGroup;
  date= new Date();
  meseInLettere: any;
  public isEmojiPickerVisible!: boolean;
  public comment: string = '';
  spinner:boolean = false
  showEmoji:boolean=false
  value:any
  realIterations: any=[];
  iterazioni: any=[];
  isItLiked: boolean;
  perLikes: number;
  perPerLikes: number;
  likeSound: HTMLAudioElement;
  @Output() idKeyDiChiVisita = new EventEmitter<string>();
    public addEmoji(event: { emoji: { native: any; }; }) {
    this.comment = `${this.comment}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
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

  sendValue(){
    this.value=this.commentaForm.controls['textAC'].value
    this.cdr.markForCheck()
  }
  ngOnInit() {
    this.likeSound = new Audio('../../../../assets/come-here-notification.ogg');
    this.value=''
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
    this.commentaForm = new FormGroup({
      textAC: new FormControl(),
    });
    this.commentSound = new Audio(
      '../../../../assets/notification-pretty-good.ogg'
    );
    this.utente = this.data[2];
this.getIterations()
  }
  commentaPost(a: any) {
   this.spinner=true
   if (
      this.commentaForm.controls['textAC'].value &&
      this.commentaForm.controls['textAC'].value != '' &&
      this.commentaForm.controls['textAC'].value !=
        'Inserisci un commento con del testo'
    ) {
      this.ss.prendiCommento().subscribe((data: any) => {

        Object.keys(data).map((key) => {
          if (data[key].idQuestoCommento == a.idQuestoCommento) {
            this.ss
              .insertCommentoAlPost({
                commento: this.commentaForm.controls['textAC'].value,
                data:
                  'Il ' +
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
                dataConSecondi:
                  'Il ' +
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
                  this.date.getMinutes() +
                  ':' +
                  this.date.getSeconds(),
                idCommento: a.idQuestoCommento,
                idUtente: a.id||a.idDiChiCondivide,
                nome: this.utente.nome + ' ' + this.utente.cognome,
                immagine: this.utente.avatar,
                id: this.utente.id,
              })
              .subscribe((dat: any) => {
                this.ss.modificaCommentoAlPost(dat.name,{
                  idQuestoCommento:dat.name
                }).subscribe(d=>{
                   this.commentiArray = [];
                if(a.id&&a.id!=this.utente.id||
                  a.idDiChiCondivide&&a.idDiChiCondivide!=this.utente.id){
                  this.ss.postNotifica({
                    azione:'commento',
                    da:[this.utente.avatar,this.utente.nome,this.utente.cognome],
                    a:a.id||a.idDiChiCondivide,
                    idCommento:a.idQuestoCommento,
                    titoloCommento:a.titolo||a.commento,
                    immagineCommento:a.immaginePostata||''
                  }).subscribe(data=>{

                  })
                }
                })

                this.ss.getAllStories().subscribe((e:any)=>{
                  if(e){
                    Object.keys(e).map((k:any)=>{
                    if(e[k].idUtente==this.utente.id){
                      this.ss.modificaCommentoAlPost(data.name,{storia:true}).subscribe(a=>{
                      })
                    }
                  })
                  }
                  setTimeout(()=>{this.ss.prendiCommentoalPost().subscribe((data: any) => {
                  Object.keys(data).map((key) => {
                    if (data[key].idCommento == this.data[0].idQuestoCommento) {
                      this.commentiArray.push(data[key]);
                    }
                    this.cdr.markForCheck();
                  });
                  this.commentSound.play()
                  this.commentaForm.controls['textAC'].setValue('')
                });},700)
                })
              });
          }
        });
      });
    } else {
      this.commentaForm.controls['textAC'].setValue(
        'Inserisci un commento con del testo'
      );
    }
    setTimeout(()=>{
this.spinner=false
    },1000)

  }
  onUpdateCialogFormValue(event:any){
    if(event.length<=2){
      this.commentaForm.controls['textAC'].setValue(this.commentaForm.controls['textAC'].value==null?event:this.commentaForm.controls['textAC'].value+event)
    }else if(event.length>2){
      this.commentaForm.controls['textAC'].setValue( this.commentaForm.controls['textAC'].value.substring(0, this.commentaForm.controls['textAC'].value.lastIndexOf(" ")+1||
      this.commentaForm.controls['textAC'].value.lastIndexOf(this.commentaForm.controls['textAC'].value.length)) + event)
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
      this.ss.prendiCommCommentiAiCommenti().subscribe((commenti:any)=>{
if(commenti){
  let comments =[]
Object.keys(commenti).map((chiave:any)=>{
  comments.push(commenti[chiave])
})
console.log(comments)
  const dialogRef = this.dialog.open(CommentiCommentiComponent,
  {
    width:Dynamics.width600,
    height:Dynamics.height600,
    data:[commento,this.utente,comments]
  })

this.dialogRef.afterClosed().subscribe((data:any)=>{
})
}else{
  const dialogRef = this.dialog.open(CommentiCommentiComponent,
    {
      width:Dynamics.width600,
      height:Dynamics.height600,
      data:[commento,this.utente,[]]
    })

  this.dialogRef.afterClosed().subscribe((data:any)=>{
  })
}
      })
    }

elimina(commento:any){
  this.ss.prendiCommCommentiAiCommenti().subscribe((commCommenti:any)=>{
    if(commCommenti){Object.keys(commCommenti).map((keys:any)=>{
      if(commCommenti[keys].idCommento==commento.idQuestoCommento){
        this.ss.eliminaCommentoAiComm(commCommenti[keys].idQuestoCommento).subscribe((data:any)=>{})
      }
    })}
    this.ss.getIterazioniCommentiAiCommenti().subscribe((interazioniCommComm:any)=>{
    if(interazioniCommComm){
      Object.keys(interazioniCommComm).map((chiavi:any)=>{
        if(interazioniCommComm[chiavi].postPiaciuto==commento.idQuestoCommento){
          this.ss.eliminaIterazioneAiComm(chiavi).subscribe((datas:any)=>{})
        }
      })
    }
      this.ss.eliminaCommentoAlPost(commento.idQuestoCommento).subscribe((comms:any)=>{
        console.log('commentoEliminato')
         setTimeout(()=>{this.ss.prendiCommentoalPost().subscribe((data: any) => {
          if(data){
            this.commentiArray=[]
              Object.keys(data).map((key) => {
        if (data[key].idCommento == this.data[0].idQuestoCommento) {
          this.commentiArray.push(data[key]);
        }
        this.cdr.markForCheck();
      })
          }
    });},500)
      })
    })

  })

}

}
