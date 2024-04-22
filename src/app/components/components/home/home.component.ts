import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  Input,
  HostListener,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { CialogStoriesComponent } from '../../dialog/cialog-stories/cialog-stories.component';
import { DialogToViewStoriesComponent } from '../../dialog/dialog-to-view-stories/dialog-to-view-stories.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DialogForIterationsComponent } from '../../dialog/dialog-for-iterations/dialog-for-iterations.component';
import { OnHoverDialogComponent } from '../../dialog/on-hover-dialog/on-hover-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogPostImageComponent } from '../../dialog/dialog-post-image/dialog-post-image.component';
import { DialogCommentiComponent } from '../../dialog/dialog-commenti/dialog-commenti.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dial!: boolean;
  stringToHover!: string;
  term!: string;
  persone: any = [];
  @Input() utente: any;
  forPost: any[] = [];
  utenti: any[] = [];
  profiloForm!: FormGroup;
  commentaForm!: FormGroup;
  commentiPersonali: any;
  commentiPersonal: any[] = [];
  @Input() data!: Date;
  @Input() meseInLettere: any;
  thumbUp: any = true;
  booleanArray: any[] = [];
  postIterati: any;
  showPostsIterati: boolean = false;
  bacheca: boolean = true;
  personalComments: any;
  commentiPersonali2: any;
  commentoPersonalBoolean: boolean = true;
  commenta: boolean = false;
  commentaArray: any[] = [];
  commentiAiPosts: any = [];
  allPosts: any;
  allTogheter: any[] = [];
  tHuMb: boolean = true;
  iterazioni: any = [];
  showCommenti: boolean = false;
  idPersonale: any;
  searchForm!: FormGroup;
  iscritti: any = [];
  ricercaContatti!: boolean;
  personeCheSegui: any = [];
  arrayPerFiltrarePersone: any;
  showPersoneCheSegui!: boolean;
  AreThereStories: boolean = false;

  @Output() profile = new EventEmitter<string>();
  @Output() idKeyDaVisitare = new EventEmitter<string>();
  @Output() idKeyDiChiVisita = new EventEmitter<string>();
  @Output() urlPerImmagineNavbar = new EventEmitter<string>();
  @Output() visit = new EventEmitter<string>();
  @Input() color:string
  @Input() text:string
  personeArray: any = [];
  followedByYouPersons!: boolean;
  bgImage: any;
  arrayPerStorie: any = [];
  scrollStrategy!: ScrollStrategy;
  realIterations: any = [];
  isItLiked!: boolean;
  perLikes!: number;
  perPerLikes!: number;
  personeCheTiSeguono: any = [];
  likeSound!: HTMLAudioElement;
  postSound!: HTMLAudioElement;
  shareSound!: HTMLAudioElement;
  commentSound!: HTMLAudioElement;
  variableImg!: any;
  userXHover: any;
  postsArray: any = [];
  arrayXLikesHover: any = [];
  seguitiXHover: any = [];
  tiSeguonoXHover: any = [];
  count!: number;
  classes:any=[]
  @Input()songs
  items: any;
  previousAudio:any
  audio = new Audio();
  constructor(
    private ss: ServiziService,
    private dialog: MatDialog,
    private readonly sso: ScrollStrategyOptions,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this.ss.getUsers().subscribe((data: any) => {
      this.persone = Object.keys(data).map((key) => {
        return data[key];
      });
      this.personeArray = Object.keys(data).map((key) => {
        return data[key];
      });
      this.cdr.markForCheck();
      Object.keys(data).map((key: any) => {
        data[key].email == localStorage.getItem('email')
          ? this.goChats(key, data[key].avatar)
          : '';
      });
      this.personeArray.filter((data: any) => {
        if (data.email !== localStorage.getItem('email')) {
          this.iscritti.push(data);
        }
      });
    });
    this.scrollStrategy = this.sso.noop();
  }
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

    this.ricercaContatti = false;
    this.postSound = new Audio('../../../../assets/so-proud-notification.ogg');
    this.shareSound = new Audio(
      '../../../../assets/ringtone-you-would-be-glad-to-know.ogg'
    );
    this.commentSound = new Audio(
      '../../../../assets/notification-pretty-good.ogg'
    );
    this.likeSound = new Audio('../../../../assets/come-here-notification.ogg');

    this.dial = false;
    this.stringToHover = '';
    this.isItLiked = false;
    this.profiloForm = new FormGroup({
      immagineCaricata: new FormControl(),
    });
    setTimeout(() => {
      this.ss.getIterazioni().subscribe((data: any) => {
        if (data) {
          this.iterazioni = Object.keys(data).map((key) => {
            return data[key];
          });
        }
      });
    }, 200);
    setTimeout(() => {
      this.ss.prendiCommentoalPost().subscribe((data: any) => {
        if (data) {
          this.commentiAiPosts = Object.keys(data).map((key) => {
            return data[key];
          });
        }
      });
    }, 300);
    setTimeout(() => {
      this.ss.getRelazione().subscribe((datas: any) => {
        if (datas) {
          this.getStories();
          Object.keys(datas).map((key: any) => {
            if (datas[key].idCheSegue == this.utente.id) {
              this.ss.getUsers().subscribe((data: any) => {
                if (data) {
                  this.personeCheSegui.push(data[datas[key].idSeguito]);
                }
              });
            } else if (
              datas[key].idCheSegue != this.utente.id &&
              datas[key].idSeguito == this.utente.id
            ) {
              this.ss.getUsers().subscribe((data: any) => {
                if (data) {
                  this.personeCheTiSeguono.push(data[datas[key].idCheSegue]);
                }
              });
            }
          });
        }
      });
    }, 650);
    setTimeout(() => {
      this.unaPerTuttiCommenti();
      this.spinner.hide();
    }, 2800);
  }

  goChats(a: string, b: string) {
    this.idKeyDiChiVisita.emit(a);
    this.urlPerImmagineNavbar.emit(b);
  }
  unaPerTuttiCommenti() {
    this.commentiPersonali=[]
    this.ss.prendiCommento().subscribe((data: any) => {
      if (data) {
        this.commentiPersonali = Object.keys(data).map((key) => {
          return data[key]
        });

      this.items=this.commentiPersonali
      }
    });
  }
  addStories() {
    const dialogRef = this.dialog.open(CialogStoriesComponent, {
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result&&result.titolo||result.file) {
        this.ss
          .aggiungiStoria({
            idUtente:this.utente.id,
            email: this.utente.email,
            data: this.data.getTime(),
            titolo: result.titolo == null ? '' : result.titolo,
            file: result.file || '',
          })
          .subscribe((datas: any) => {
            this.ss
              .modificaStoria(datas.name, {
                id: datas.name,
              })
              .subscribe((data: any) => {
this.ss.getAllStories().subscribe((da:any)=>{
Object.keys(da).map((ke:any)=>{
  this.ss.prendiCommento().subscribe((d:any)=>{
                  Object.keys(d).map((k:any)=>{
if(d[k].id&&d[k].id==da[ke].idUtente){
  this.ss.modificaCommento(k,{storia:true}).subscribe((data:any)=>{})
}else if(d[k].idDiChiCondivide&&d[k].idDiChiCondivide==da[ke].idUtente){
  this.ss.modificaCommento(k,{storia:true}).subscribe((data:any)=>{})
}
 this.unaPerTuttiCommenti()
                  })
})
this.ss.prendiCommentoalPost().subscribe((e:any)=>{
  Object.keys(e).map((z:any)=>{
    if(e[z].id==da[ke].idUtente){
      this.ss.modificaCommentoAlPost(z,{storia:true}).subscribe((data:any)=>{})
  }
})
this.commentiAiPosts = Object.keys(data).map((key) => {
            return data[key];
          });
})
})
           this.getStories();
                })
              });
          });
      }
    });
  }
  getStories() {
    this.arrayPerStorie = [];
    this.ss.getAllStories().subscribe((data: any) => {
      if (data) {
        Object.keys(data).map((key: any) => {
          let endTime = new Date();
          if ((data[key].data - endTime.getTime()) / 1000 < -200) {
            this.ss.prendiCommentoalPost().subscribe((e:any)=>{
                Object.keys(e).map((z:any)=>{
                  if(e[z].id==data[key].idUtente){
                    this.ss.modificaCommentoAlPost(z,{storia:false}).subscribe((data:any)=>{})
                }
              })
              })
            this.ss.getStorieViste().subscribe((datas: any) => {
              if(datas){
              Object.keys(datas).map((keys: any) => {
                if (datas[keys].storia == key) {
                  this.ss.eliminaStorieViste(keys).subscribe((data: any) => {});
                }});
              }
            });
              this.ss.eliminaStoria(key).subscribe((data: any) => {
              });
          } else if (data[key].email == this.utente.email) {
            this.arrayPerStorie.push(data[key]);
            this.AreThereStories = true;
          }
        });
      }if(this.arrayPerStorie.length==0){
        this.ss.prendiCommento().subscribe((detas:any)=>{
Object.keys(detas).map((ki:any)=>{
  if(detas[ki].id&& detas[ki].id==this.utente.id){
    this.ss.modificaCommento(detas[ki].idQuestoCommento,{storia:false}).subscribe((a:any)=>{})
  }else if(detas[ki].idDiChiCondivide&& detas[ki].idDiChiCondivide==this.utente.id){
    this.ss.modificaCommento(detas[ki].idQuestoCommento,{storia:false}).subscribe((a:any)=>{})
  }
  this.ss.prendiCommentoalPost().subscribe((e:any)=>{
    if(e){
 Object.keys(e).map((z:any)=>{
      if(e[z].id==this.utente.id){
        this.ss.modificaCommentoAlPost(z,{storia:false}).subscribe((data:any)=>{})
    }
  })
    }

  })
})
        })
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
  getIterations() {
    this.iterazioni = [];
    this.ss.getIterazioni().subscribe((data: any) => {
      if (data) {
        this.iterazioni = Object.keys(data).map((key) => {
          return data[key];
        });
      }
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
  goCheckIterations(a: any) {
    const dialogRef = this.dialog.open(DialogForIterationsComponent, {
      data: [a, this.utente, this.utente.id],
      width: '600px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
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
    const event = new KeyboardEvent("keydown",{
      'key': 'Escape'
      });
      document.dispatchEvent(event);
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
  viewFileValue(a: any) {
    if (a.target.files && a.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.variableImg = (<FileReader>event.target).result;
        this.cdr.detectChanges();
        const dialogRef = this.dialog.open(DialogPostImageComponent, {
          data: [this.utente, this.variableImg,this.songs],
          width: '600px',
          height: '695px',
          autoFocus: false,
        });
        dialogRef.afterClosed().subscribe((data: any) => {
          if (data != undefined && data[1]) {
            console.log(data)
            this.ss
              .insertCommento({
                commento: data[0]|| ' ',
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
                text:data[3]||null,
                song:data[2]||null
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
  goCheckCommenti(a: any, b: any, c: any) {
    const dialogRef = this.dialog.open(DialogCommentiComponent, {
      data: [a, b, c],
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.commentiAiPosts = [];
      this.ss.prendiCommentoalPost().subscribe((data: any) => {
        if (data) {
          this.commentiAiPosts = Object.keys(data).map((key) => {
            return data[key];
          });
        } else {
          this.commentiAiPosts = [];
        }
        if(res){
           this.goVisitUtente(res)
        }
      });
      this.cdr.markForCheck();
    });
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
              });
              dialogRef.afterClosed().subscribe((result: any) => {
                if (
                  result == 'blabla' ||
                  result == undefined ||
                  result == null
                ) {
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
                      if (
                        (a.idDiChiCondivide &&
                          a.idDiChiCondivide != this.utente.id) ||
                        (a.id && a.id != this.utente.id)
                      ) {
                        this.ss
                          .postNotifica({
                            azione: 'condivisione',
                            da: [
                              this.utente.avatar,
                              this.utente.nome,
                              this.utente.cognome,
                            ],
                            a: a.idDiChiCondivide || a.id,
                            idCommento: a.idQuestoCommento,
                            titoloCommento: a.titolo || a.commento,
                            immagineCommento: a.immaginePostata || '',
                          })
                          .subscribe((data) => {});
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
                      if (
                        (a.idDiChiCondivide &&
                          a.idDiChiCondivide != this.utente.id) ||
                        (a.id && a.id != this.utente.id)
                      ) {
                        this.ss
                          .postNotifica({
                            azione: 'condivisione',
                            da: [
                              this.utente.avatar,
                              this.utente.nome,
                              this.utente.cognome,
                            ],
                            a: a.idDiChiCondivide || a.id,
                            idCommento: a.idQuestoCommento,
                            titoloCommento: a.titolo || a.commento,
                            immagineCommento: a.immaginePostata || '',
                          })
                          .subscribe((data) => {});
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
              });

              dialogRef.afterClosed().subscribe((result: any) => {
                if (
                  result == 'blabla' ||
                  result == undefined ||
                  result == null
                ) {
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
                      if (
                        (a.idDiChiCondivide &&
                          a.idDiChiCondivide != this.utente.id) ||
                        (a.id && a.id != this.utente.id)
                      ) {
                        this.ss
                          .postNotifica({
                            azione: 'condivisione',
                            da: [
                              this.utente.avatar,
                              this.utente.nome,
                              this.utente.cognome,
                            ],
                            a: a.idDiChiCondivide || a.id,
                            idCommento: a.idQuestoCommento,
                            titoloCommento: a.titolo || a.commento,
                            immagineCommento: a.immaginePostata || '',
                          })
                          .subscribe((data) => {});
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
                      if (
                        (a.idDiChiCondivide &&
                          a.idDiChiCondivide != this.utente.id) ||
                        (a.id && a.id != this.utente.id)
                      ) {
                        this.ss
                          .postNotifica({
                            azione: 'condivisione',
                            da: [
                              this.utente.avatar,
                              this.utente.nome,
                              this.utente.cognome,
                            ],
                            a: a.idDiChiCondivide || a.id,
                            idCommento: a.idQuestoCommento,
                            titoloCommento: a.titolo || a.commento,
                            immagineCommento: a.immaginePostata || '',
                          })
                          .subscribe((data) => {});
                      }
                    });
                }
              });
            });
        });
    }
  }
  sortPostIterati() {
    return this.postIterati.sort((b: any, a: any) => {
      return <any>new Date(b.data) - <any>new Date(a.data);
    });
  }
}
