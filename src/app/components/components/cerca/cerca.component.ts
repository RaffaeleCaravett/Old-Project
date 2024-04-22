import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { DialogToViewStoriesComponent } from '../../dialog/dialog-to-view-stories/dialog-to-view-stories.component';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.scss'],
})
export class CercaComponent implements OnInit {
  term!: string;
  ricercaContatti!: boolean;
  searchForm!: FormGroup;
  persone!: any[];
  personeArray!: any[];
  iscritti: any = [];
  AreThereStories!: boolean;
  arrayPerStorie: any = [];
  idUtente!: string;
  utente: any = [];
  @Output() profile = new EventEmitter<string>();
  @Output() idKeyDaVisitare = new EventEmitter<string>();
  @Output() idKeyDiChiVisita = new EventEmitter<string>();
  @Output() visit = new EventEmitter<string>();
  @Input() bg:string
  @Input() text:string


  constructor(
    private ss: ServiziService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.ss.getUsers().subscribe((data: any) => {
      this.persone = Object.keys(data).map((key) => {
        return data[key];
      });
      this.personeArray = Object.keys(data).map((key) => {
        return data[key];
      });

      Object.keys(data).map((key) => {
        if (data[key].email == localStorage.getItem('email')) {
          this.idUtente = key;
          this.utente.push(data[key]);
        }
      });
      this.personeArray.filter((data: any) => {
        if (data.email !== localStorage.getItem('email')) {
          this.iscritti.push(data);
        }
      });
    });

    this.getStories();
  }

  ngOnInit(): void {}
  getStories() {
    this.ss.getAllStories().subscribe((data: any) => {
      if (data) {
        Object.keys(data).map((key: any) => {
          if (data) {
            let endTime = new Date();
            if ((data[key].data - endTime.getTime()) / 1000 < -3600) {
              this.ss.eliminaStoria(key).subscribe((data: any) => {});
              this.arrayPerStorie.push(data[key]);
              console.log(this.arrayPerStorie);
              this.AreThereStories = true;
              this.cdr.detectChanges();
            }
          }
        });
      }
    });
  }
  goCheckStories() {
    if (this.arrayPerStorie.length > 0) {
      const dialogRef = this.dialog.open(DialogToViewStoriesComponent, {
        data: {
          data: this.arrayPerStorie,
          idDiChiVisita: this.idUtente,
        },
        height: '500px',
        width: '400px',
        autoFocus: false,
        // scrollStrategy: this.scrollStrategy
      });

      dialogRef.afterClosed().subscribe((result: any) => {});
    }
  }

  goVisitUtente(a: any) {
    console.log(a);
    this.ss.getUsers().subscribe((data: any) => {
      Object.keys(data).map((key) => {
        if (localStorage.getItem('email') == data[key].email) {
          this.idKeyDiChiVisita.emit(key);
        }
      });
      Object.keys(data).map((key) => {
        if (data[key].email == a.email) {
          this.emitter(key);
        }
      });
    });
  }
  emitter(a: string) {
    this.idKeyDaVisitare.emit(a);
    this.visit.emit('');

    this.profile.emit('visitProfile');

    this.visit.emit('ok');
  }

  openDiv() {
    if (this.ricercaContatti) {
      setTimeout(() => {
        this.ricercaContatti = false;
      }, 2000);
    } else {
      this.ricercaContatti = true;
    }
  }
}
