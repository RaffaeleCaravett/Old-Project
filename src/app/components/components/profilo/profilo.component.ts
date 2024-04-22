import { ChangeDetectorRef,Component,ElementRef,EventEmitter,HostListener,Input,OnChanges,OnDestroy,OnInit,Output, QueryList, ViewChildren,} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CialogStoriesComponent } from '../../dialog/cialog-stories/cialog-stories.component';
import { DialogToViewStoriesComponent } from '../../dialog/dialog-to-view-stories/dialog-to-view-stories.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DialogForIterationsComponent } from '../../dialog/dialog-for-iterations/dialog-for-iterations.component';
import { Router } from '@angular/router';
import { OnHoverDialogComponent } from '../../dialog/on-hover-dialog/on-hover-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogCommentiComponent } from '../../dialog/dialog-commenti/dialog-commenti.component';
import { DialogPostImageComponent } from '../../dialog/dialog-post-image/dialog-post-image.component';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements OnInit, OnChanges {
  persone: any = [];
  showPersoneCheSegui!: boolean;
  @Input() utente: any
  forPost: any[] = [];
  utenti: any[] = [];
  profiloForm!: FormGroup;
  commentaForm!: FormGroup;
  commentiPersonali: any;
  commentiPersonal: any[] = [];
  @Input()data!:Date;
  @Input()meseInLettere!:string;
  thumbUp: any = true;
  booleanArray: any[] = [];
  showPostsIterati: boolean = false;
  bacheca: boolean = true;
  personalComments: any;
  commentiPersonali2: any[] = [];
  commentoPersonalBoolean: boolean = true;
  commenta: boolean = false;
  commentaArray: any[] = [];
  commentiAiPosts: any;
  iterazioni: any = [];
  showCommenti: boolean = false;
  viewComments: any[] = [];
  idPersonale: any;
  forInteractions: any;
  tHuMb: boolean = true;
  personeCheTiSeguono: any = [];
  personeCheSegui: any = [];
  tuttiICommenti: any = [];
  @Output() profile = new EventEmitter<string>();
  @Output() idKeyDaVisitare = new EventEmitter<string>();
  @Output() idKeyDiChiVisita = new EventEmitter<string>();
  @Output() visit = new EventEmitter<string>();

  arrayPerStorie: any = [];
  AreThereStories!: boolean;
  scrollStrategy!: ScrollStrategy;
  postCondivisi: any = [];
  realIterations: any = [];
  isItLiked!: boolean;
  perLikes!: number;
  perPerLikes!: number;
  forIterazioniNumber: any = [];
  post!: boolean;
  where!: string;
  postPiaciuti: any = [];
  toFilterFavorites: any = [];
  dial!: boolean;
  likeSound!: HTMLAudioElement;
  commentSound!: HTMLAudioElement;
  shareSound!: HTMLAudioElement;
  postSound!: HTMLAudioElement;
  postPiuPiaciuti: any = [];
  piuPiaciutiSemiFinal: any = [];
  finalPiuPiaciuti: any = [];
  finalFinalPiuPiaciuti: any = [];
  variableImg!: any
  @Input() color:string
  @Input() text:string
  postsArray: any=[];
  arrayXLikesHover: any=[];
  seguitiXHover: any=[];
  tiSeguonoXHover: any=[];
  userXHover: any;
  @Input()songs
  constructor(
    private spinner: NgxSpinnerService,
    private ss: ServiziService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private readonly sso: ScrollStrategyOptions,
    private router: Router
  ) {
    this.scrollStrategy = this.sso.noop();
    this.utente
  }
  previousAudio:any
  audio = new Audio();
  @ViewChildren('divElements', { read: ElementRef }) divElements!: QueryList<ElementRef>;
  @ViewChildren('audio', { read: ElementRef }) audios!: QueryList<ElementRef>;
ngAfterViewInit() {
  this.logClosestDivToCenter();
}

logClosestDivToCenter() {
  const windowCenterY = window.innerHeight / 2;
  let closestDiv: ElementRef | null = null;
  let minDistanceToCenter = Number.POSITIVE_INFINITY;

  this.divElements.forEach((divElement: ElementRef) => {
    const rect = divElement.nativeElement.getBoundingClientRect();
    const elementCenterY = rect.top + rect.height / 2;
    const distanceToCenter = Math.abs(elementCenterY - windowCenterY);

    if (distanceToCenter < minDistanceToCenter) {
      minDistanceToCenter = distanceToCenter;
      closestDiv = divElement;
    }
  });

  if (closestDiv ){
    if(closestDiv.nativeElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[2]
      &&closestDiv.nativeElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[2].src){
if(this.previousAudio!=closestDiv.nativeElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[2].src){
  this.audios.forEach(element=>{
    if(element.nativeElement.src==closestDiv.nativeElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[2].src){
element.nativeElement.play()
    }else{
      element.nativeElement.pause()
    }
  })
   this.previousAudio=closestDiv.nativeElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[2].src;}
}else{
  this.audios.forEach(element=>{
    if(element.nativeElement.paused==false){
element.nativeElement.pause()
    }
  })
  this.previousAudio=''
}
}
}
@HostListener('document:mousewheel', ['$event'])
onScroll() {
  this.logClosestDivToCenter();
}
volume:boolean=true
setVolume(volume:any){
  this.audios.forEach(element=>{
    if(element.nativeElement.volume!=0){
      element.nativeElement.volume=0
      this.volume=false
    }else{
      element.nativeElement.volume=1
      this.volume=true
    }

  })
}
  ngOnInit(): void {
    this.postSound = new Audio('../../../../assets/so-proud-notification.ogg');
    this.shareSound = new Audio(
      '../../../../assets/ringtone-you-would-be-glad-to-know.ogg'
    );
    this.likeSound = new Audio('../../../../assets/come-here-notification.ogg');
    this.dial = false;
    this.where = 'post';
    this.isItLiked = false;
    this.personeCheSegui = [];
    this.personeCheTiSeguono = [];
    this.profiloForm = new FormGroup({
      immagineCaricata: new FormControl(),
    });
    this.unaPerTuttiCommenti();
    setTimeout(() => {
      this.getIterations();
      this.ss.prendiCommentoalPost().subscribe((data: any) => {
        if (data) {
          this.commentiAiPosts = Object.keys(data).map((key) => {
            return data[key];
          });
        } else {
          this.commentiAiPosts = [];
        }
      });
    }, 500);
    setTimeout(() => {
      this.ss.getRelazione().subscribe((datas: any) => {
        this.getStories();
        if (datas) {
          Object.keys(datas).map((key: any) => {
            if (datas[key].idCheSegue == this.utente.id) {
              this.ss.getUsers().subscribe((data: any) => {
                if (data[datas[key].idSeguito] != undefined) {
                  this.personeCheSegui.push(data[datas[key].idSeguito]);
                }
              });
            } else if (
              datas[key].idCheSegue != this.utente.id &&
              datas[key].idSeguito == this.utente.id
            ) {
              this.ss.getUsers().subscribe((data: any) => {
                if (data[datas[key].idCheSegue] != undefined) {
                  this.personeCheTiSeguono.push(data[datas[key].idCheSegue]);
                }
              });
            }
          });
        } else {
          this.personeCheSegui = [];
          this.personeCheTiSeguono = [];
        }
      });
    }, 800);

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.showPersoneCheSegui = false;
  }
  addStories() {
    const dialogRef = this.dialog.open(CialogStoriesComponent, {
      height: '600px',
      width: '600px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == '' || result == null || result == undefined) {
      } else {
        if (result.file || result.titolo) {
          this.ss
            .aggiungiStoria({
              titolo: result.titolo,
              file: result.file,
              email: this.utente.email,
              data: this.data.getTime(),
            })
            .subscribe((data: any) => {
              data;
            });
        }
      }
    });
  }
  getStories() {
    this.arrayPerStorie = [];
    this.ss.getAllStories().subscribe((data: any) => {
      if (data) {
        Object.keys(data).map((key: any) => {
          let endTime = new Date();
          if ((data[key].data - endTime.getTime()) / 1000 < -3600) {
            this.ss.eliminaStoria(key).subscribe((data: any) => {});
          } else if (data[key].email == this.utente.email) {
            this.arrayPerStorie.push(data[key]);
            this.AreThereStories = true;
          }
        });
      } else {
        this.arrayPerStorie = [];
      }
    });
  }
  goCheckStories() {
    if (this.arrayPerStorie.length > 0) {
      const dialogRef = this.dialog.open(DialogToViewStoriesComponent, {
        data: {
          data: this.arrayPerStorie,
          idDiChiVisita: this.utente.id,
        },
        height: '600px',
        width: '600px',
        autoFocus: false,
        scrollStrategy: this.scrollStrategy,
      });

      dialogRef.afterClosed().subscribe((result: any) => {});
    }
  }
  unaPerTuttiCommenti() {
    this.commentiPersonal = [];
    this.commentiPersonali = [];
    this.postCondivisi = [];
    this.ss.prendiCommento().subscribe((data: any) => {
      this.commentiPersonali = Object.keys(data).map((key) => {
        return data[key];
      });

      this.commentiPersonali.filter((dat: any) => {
        if (dat.titolo) {
          if (dat.idDiChiCondivide == this.utente.id) {
            this.postCondivisi.push(dat);
            this.postCondivisi = this.postCondivisi.reverse();
          }
        }
      });

      this.commentiPersonali.filter((datas: any) => {
        if (!datas.titolo) {
          if (datas.id == this.utente.id) {
            this.commentiPersonal.push(datas);
            this.commentiPersonal = this.commentiPersonal.reverse();
          }
        }
      });
    });
  }

  openDialog(a: any): void {
    if (!a.titolo) {
      this.ss
        .insertCommento({
          commentoDelCommentoCondiviso: a.commento,
          dataDellaCondivisione:
            'Il ' +
            this.data.getDate() +
            ' ' +
            this.meseInLettere +
            ' ' +
            this.data.getFullYear() +
            ' ' +
            'alle' +
            ' ' +
            this.data.getHours() +
            ':' +
            this.data.getMinutes(),
          dataDelCommentoCondiviso: a.data,
          nomeDiChiCondivide: this.utente.nome + ' ' + this.utente.cognome,
          nomeDelCommentoCondiviso: a.nome,
          immagineDiChiCondivide: this.utente.avatar,
          immagineDelCommentoCondiviso: a.immagine,
          idDiChiCondivide: this.utente.id,
          idUtenteDelCommentoCondiviso: a.id,
          thumbUp: true,
          commenta: false,
          view: false,
          dataConSecondi:
            'Il ' +
            this.data.getDate() +
            ' ' +
            this.meseInLettere +
            ' ' +
            this.data.getFullYear() +
            ' ' +
            'alle' +
            ' ' +
            this.data.getHours() +
            ':' +
            this.data.getMinutes() +
            ':' +
            this.data.getSeconds(),
          idQuestoCommento: '',
          vediIterazione: false,
          immaginePostata: a.immaginePostata || '',
        })
        .subscribe((data: any) => {
          this.ss
            .modificaCommento(data.name, {
              idQuestoCommento: data.name,
            })
            .subscribe((data: any) => {
              const dialogRef = this.dialog.open(DialogComponent, {
                data: a,
                width: '600px',
                height: '695px',
              });

              dialogRef.afterClosed().subscribe((result: any) => {
                console.log(data);
                if (result == 'blabla' || result == undefined) {
                  this.ss
                    .eliminaCommento(data.idQuestoCommento)
                    .subscribe((data: any) => {});
                } else if (result == '') {
                  this.ss
                    .modificaCommento(data.idQuestoCommento, {
                      titolo: ' ',
                    })
                    .subscribe((data: any) => {
                      this.shareSound.play();
                      this.unaPerTuttiCommenti();
                      if(a.id&&a.id!=this.utente.id||
                    a.idDiChiCondivide&&a.idDiChiCondivide!=this.utente.id){
                      this.ss.postNotifica({
                        azione:'condivisione',
                        da:[this.utente.avatar,this.utente.nome,this.utente.cognome],
                        a:a.idDiChiCondivide,
                        idCommento:a.idQuestoCommento,
                        titoloCommento:a.titolo||a.commento,
                        immagineCommento:a.immaginePostata||''
                      }).subscribe(data=>{

                      })
                    }
                    });
                } else {
                  this.ss
                    .modificaCommento(data.idQuestoCommento, {
                      titolo: result,
                    })
                    .subscribe((data: any) => {
                      this.shareSound.play();
                      this.unaPerTuttiCommenti();
                      if(a.id&&a.id!=this.utente.id||
                    a.idDiChiCondivide&&a.idDiChiCondivide!=this.utente.id){
                      this.ss.postNotifica({
                        azione:'condivisione',
                        da:[this.utente.avatar,this.utente.nome,this.utente.cognome],
                        a:a.idDiChiCondivide,
                        idCommento:a.idQuestoCommento,
                        titoloCommento:a.titolo||a.commento,
                        immagineCommento:a.immaginePostata||''
                      }).subscribe(data=>{

                      })
                    }
                    });
                }
              });
            });
        });
    } else {
      this.ss
        .insertCommento({
          commentoDelCommentoCondiviso: a.commentoDelCommentoCondiviso,
          dataDellaCondivisione:
            'Il ' +
            this.data.getDate() +
            ' ' +
            this.meseInLettere +
            ' ' +
            this.data.getFullYear() +
            ' ' +
            'alle' +
            ' ' +
            this.data.getHours() +
            ':' +
            this.data.getMinutes(),
          dataDelCommentoCondiviso: a.dataDelCommentoCondiviso,
          nomeDiChiCondivide: this.utente.nome + ' ' + this.utente.cognome,
          nomeDelCommentoCondiviso: a.nomeDelCommentoCondiviso,
          immagineDiChiCondivide: this.utente.avatar,
          immagineDelCommentoCondiviso: a.immagineDelCommentoCondiviso,
          idDiChiCondivide: this.utente.id,
          idUtenteDelCommentoCondiviso: a.idUtenteDelCommentoCondiviso,
          thumbUp: true,
          commenta: false,
          view: false,
          dataConSecondi:
            'il' +
            this.data.getDate() +
            ' ' +
            this.meseInLettere +
            ' ' +
            this.data.getFullYear() +
            ' ' +
            'alle' +
            ' ' +
            this.data.getHours() +
            ':' +
            this.data.getMinutes() +
            ':' +
            this.data.getSeconds(),
          idQuestoCommento: '',
          vediIterazione: false,
          immaginePostata: a.immaginePostata || '',
        })
        .subscribe((data: any) => {
          this.ss
            .modificaCommento(data.name, {
              idQuestoCommento: data.name,
            })
            .subscribe((data: any) => {
              const dialogRef = this.dialog.open(DialogComponent, {
                data: a,
                width: '600px',
                height: '695px',
              });

              dialogRef.afterClosed().subscribe((result: any) => {
                console.log(result);
                if (result == 'blabla' || result == undefined) {
                  this.ss
                    .eliminaCommento(data.idQuestoCommento)
                    .subscribe((data: any) => {});
                } else if (result == '') {
                  this.ss
                    .modificaCommento(data.idQuestoCommento, {
                      titolo: ' ',
                    })
                    .subscribe((data: any) => {
                      this.shareSound.play();
                      this.unaPerTuttiCommenti();
                      if(a.id&&a.id!=this.utente.id||
                    a.idDiChiCondivide&&a.idDiChiCondivide!=this.utente.id){
                      this.ss.postNotifica({
                        azione:'condivisione',
                        da:[this.utente.avatar,this.utente.nome,this.utente.cognome],
                        a:a.idDiChiCondivide,
                        idCommento:a.idQuestoCommento,
                        titoloCommento:a.titolo||a.commento,
                        immagineCommento:a.immaginePostata||''
                      }).subscribe(data=>{

                      })
                    }
                    });
                } else {
                  this.ss
                    .modificaCommento(data.idQuestoCommento, {
                      titolo: result,
                    })
                    .subscribe((data: any) => {
                      this.shareSound.play();
                      this.unaPerTuttiCommenti();
                      if(a.id&&a.id!=this.utente.id||
                    a.idDiChiCondivide&&a.idDiChiCondivide!=this.utente.id){
                      this.ss.postNotifica({
                        azione:'condivisione',
                        da:[this.utente.avatar,this.utente.nome,this.utente.cognome],
                        a:a.idDiChiCondivide,
                        idCommento:a.idQuestoCommento,
                        titoloCommento:a.titolo||a.commento,
                        immagineCommento:a.immaginePostata||''
                      }).subscribe(data=>{

                      })
                    }
                    });
                }
              });
            });
        });
    }
  }

  getIterations() {
    this.iterazioni = [];
    this.forIterazioniNumber = [];
    this.postPiuPiaciuti = [];
    this.ss.getIterazioni().subscribe((data: any) => {
      if (data) {
        this.iterazioni = Object.keys(data).map((key) => {
          return data[key];
        });
        for (let iterazione of this.iterazioni) {
          iterazione.idUtenteCommento == this.utente.id
            ? this.forIterazioniNumber.push(iterazione) &&
              this.postPiuPiaciuti.push(iterazione.postPiaciuto)
            : '';
        }
      }
      const occurrencesOf = (number: any, numbers: any) =>
        numbers.reduce(
          (counter: any, currentNumber: any) =>
            number === currentNumber ? counter + 1 : counter,
          0
        );
      this.finalPiuPiaciuti = [];
      this.piuPiaciutiSemiFinal = [];
      for (let el of this.postPiuPiaciuti) {
        this.piuPiaciutiSemiFinal.push({
          numeroDiLikes: occurrencesOf(el, this.postPiuPiaciuti),
          commento: el,
        });
      }
      this.piuPiaciutiSemiFinal = Array.from(
        this.piuPiaciutiSemiFinal
          .reduce((m: any, t: any) => m.set(t.commento, t), new Map())
          .values()
      );
      this.piuPiaciutiSemiFinal.sort(
        (a: any, b: any) => b.numeroDiLikes - a.numeroDiLikes
      );
      this.ss.prendiCommento().subscribe((data: any) => {
        for (let el of this.piuPiaciutiSemiFinal) {
          Object.keys(data).map((key) => {
            if (el.commento == data[key].idQuestoCommento) {
              this.finalPiuPiaciuti.push(data[key]);
            }
          });
        }
      });
    });
  }
  like(a: any) {
    this.ss
      .insertIterazioni({
        utenteCheMetteLike: this.utente.id,
        postPiaciuto: a.idQuestoCommento,
        nomeUtente: this.utente.nome + ' ' + this.utente.cognome,
        avatar: this.utente.avatar,
        idUtenteCommento: a.idDiChiCondivide ? a.idDiChiCondivide : a.id,
      })
      .subscribe((data: any) => {
        this.getIterations();
        this.realIterations = [];
        if (
          (a.id && a.id != this.utente.id) ||
          (a.idDiChiCondivide && a.idDiChiCondivide != this.utente.id)
        ) {
          this.ss
            .postNotifica({
              azione: 'interazione',
              da: [this.utente.avatar, this.utente.nome, this.utente.cognome],
              a: a.id || a.idDiChiCondivide,
              idCommento: a.idQuestoCommento,
              titoloCommento: a.titolo || a.commento,
              immagineCommento: a.immaginePostata || '',
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
    this.ss.getIterazioni().subscribe((data: any) => {
      Object.keys(data).map((key: any) => {
        if (
          data[key].utenteCheMetteLike == this.utente.id &&
          data[key].postPiaciuto == favorite.idQuestoCommento
        ) {
          this.ss.eliminaIterazione(key).subscribe((data: any) => {
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
  ngOnChanges(changes: any) {
    console.log(changes);
  }

  goCheckIterations(a: any) {
    const dialogRef = this.dialog.open(DialogForIterationsComponent, {
      data: [a, this.utente, this.utente.id],
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id != this.utente.id) {
        this.goVisitUtente(result);
      }
    });
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
    this.cdr.detectChanges();
  }

  modify(commentoPersonale: any, value: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      data: [commentoPersonale, value],
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data != 'blabla' && data != 'elimina') {
        commentoPersonale.commento
          ? this.ss
              .modificaCommento(commentoPersonale.idQuestoCommento, {
                commento: data,
              })
              .subscribe((data: any) => {
                this.unaPerTuttiCommenti();
                this.commentSound.play();
              })
          : commentoPersonale.titolo
          ? this.ss
              .modificaCommento(commentoPersonale.idQuestoCommento, {
                titolo: data,
              })
              .subscribe((data: any) => {
                this.unaPerTuttiCommenti();
                this.commentSound.play();
              })
          : '';
      } else if (data == 'elimina') {
        this.ss
          .eliminaCommento(commentoPersonale.idQuestoCommento)
          .subscribe((data) => {
            this.unaPerTuttiCommenti();
            this.commentSound.play();
          });
      }
    });
  }
  takeFavorites(a: any) {
    if (a == 'favorite') {
      this.ss.getIterazioni().subscribe((data: any) => {
        Object.keys(data).map((key: any) => {
          if (data[key].utenteCheMetteLike == this.utente.id) {
            this.toFilterFavorites.push(data[key]);
          }
        });
        console.log(this.toFilterFavorites);
        this.ss.prendiCommento().subscribe((data: any) => {
          Object.keys(data).map((key: any) => {
            this.tuttiICommenti.push(data[key]);
          });

          for (let el of this.tuttiICommenti) {
            for (let fav of this.toFilterFavorites) {
              if (el.idQuestoCommento == fav.postPiaciuto) {
                this.postPiaciuti.push(el);
              }
            }
          }
          this.toFilterFavorites = [];
          this.tuttiICommenti = [];
        });
      });
    }
  }

  tryToOpenThisDialog(evt: MouseEvent, b: any) {
    this.postsArray = [];
    this.arrayXLikesHover = [];
    this.seguitiXHover = [];
    this.tiSeguonoXHover = [];
    const target = new ElementRef(evt.currentTarget);
    if (this.dial == false) {
      this.dial = true;
      this.ss.getUsers().subscribe((data: any) => {
        Object.keys(data).map((key) => {
          if (data[key] != undefined && b != undefined) {
            if (data[key].id == b.id) {
              this.userXHover = data[key];
            } else if (
              (!b.id && data[key].id == b.idDiChiCondivide) ||
              data[key].id == b.utenteCheMetteLike
            ) {
              this.userXHover = data[key];
            }
          }
        });
        this.ss.prendiCommento().subscribe((datas: any) => {
          Object.keys(datas).map((keys) => {
            if (datas[keys] != undefined && b != undefined) {
              if (datas[keys].id && datas[keys].id == this.userXHover.id) {
                this.postsArray.push(datas[keys]);
              } else if (
                datas[keys].nomeDiChiCondivide ==
                this.userXHover.nome + ' ' + this.userXHover.cognome
              ) {
                this.postsArray.push(datas[keys]);
              }
            }
          });
          for (let i of this.iterazioni) {
            if (i.utenteCheMetteLike == this.userXHover.id) {
              this.arrayXLikesHover.push(i);
            }
          }
          this.ss.getRelazione().subscribe((dat: any) => {
            Object.keys(dat).map((ky: any) => {
              if (dat[ky].idCheSegue == this.userXHover.id) {
                this.seguitiXHover.push(dat[ky]);
              } else if (dat[ky].idSeguito == this.userXHover.id) {
                this.tiSeguonoXHover.push(dat[ky]);
              }
            });
          });
          const dialogRef = this.dialog.open(OnHoverDialogComponent, {
            data: {
              restoreFocus: false,
              trigger: target,
              user: this.userXHover,
              posts: this.postsArray,
              autoFocus: true,
              dati: [
                this.arrayXLikesHover,
                this.seguitiXHover,
                this.tiSeguonoXHover,
              ],
            },
            hasBackdrop: false,
          });
          dialogRef.afterClosed().subscribe((_res) => {
            if (_res != undefined) {
              this.goVisitUtente(_res);
            }
            this.dial = false;
          });
        });
      });
    }
  }
  catch(a: any) {
    this.dialog.closeAll();
    this.dial = false;
  }

  emitter(a: string) {
    this.idKeyDaVisitare.emit(a);
    this.visit.emit('');

    this.profile.emit('visitProfile');

    this.visit.emit('ok');
  }

  goVisitUtente(a: any) {
    this.ss.getUsers().subscribe((data: any) => {
      Object.keys(data).map((key) => {
        data[key].email == localStorage.getItem('email')
          ? this.idKeyDiChiVisita.emit(key)
          : '';

        data[key].email == a.email ? this.emitter(key) : '';
      });
      Object.keys(data).map((key) => {
        if (data[key].email == a.email) {
          this.emitter(key);
        }
      });
    });
  }

  goCheckCommenti(a: any, b: any, c: any) {
    const dialogRef = this.dialog.open(DialogCommentiComponent, {
      data: [a, b, c],
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.commentiAiPosts=[]
      this.ss.prendiCommentoalPost().subscribe((data: any) => {
        if (data) {
          this.commentiAiPosts = Object.keys(data).map((key) => {
            return data[key];
          });
        } else {
          this.commentiAiPosts = [];
        }
      });
      this.cdr.markForCheck()
    });
  }
  viewFileValue(a: any) {
    if (a.target.files && a.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.variableImg = (<FileReader>event.target).result;
        this.cdr.detectChanges();
        const dialogRef = this.dialog.open(DialogPostImageComponent, {
          data: [this.utente, this.variableImg],
          width: '600px',
          height: '695px',
          autoFocus: false,
        });
        dialogRef.afterClosed().subscribe((data: any) => {
          if (data != undefined && data[1]) {
            this.ss
              .insertCommento({
                commento: data[0],
                data:
                  'Il ' +
                  this.data.getDate() +
                  ' ' +
                  this.meseInLettere +
                  ' ' +
                  this.data.getFullYear() +
                  ' ' +
                  'alle' +
                  ' ' +
                  this.data.getHours() +
                  ':' +
                  this.data.getMinutes(),
                nome: this.utente.nome + ' ' + this.utente.cognome,
                immagine: this.utente.avatar,
                id: this.utente.id,
                thumbUp: true,
                commenta: false,
                view: false,
                dataConSecondi:
                  'Il ' +
                  this.data.getDate() +
                  ' ' +
                  this.meseInLettere +
                  ' ' +
                  this.data.getFullYear() +
                  ' ' +
                  'alle' +
                  ' ' +
                  this.data.getHours() +
                  ':' +
                  this.data.getMinutes() +
                  ':' +
                  this.data.getSeconds(),
                idQuestoCommento: '',
                vediIterazione: false,
                immaginePostata: data[1],
              })
              .subscribe((data: any) => {
                this.ss
                  .modificaCommento(data.name, {
                    idQuestoCommento: data.name,
                  })
                  .subscribe((data: any) => {
                    this.profiloForm.reset();
                    this.variableImg = null;
                    this.postSound.play();
                    this.unaPerTuttiCommenti();
                  });
              });
          } else {
            this.variableImg = null;
          }
        });
      };
      reader.readAsDataURL(a.target.files[0]);
      this.variableImg = null;
    }
  }
  sortPostIterati() {
    if (this.iterazioni) {
      return this.iterazioni.sort((b: any, a: any) => {
        return <any>new Date(b.data) - <any>new Date(a.data);
      });
    }
  }
}
