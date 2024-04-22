import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnChanges {
  isAuthenticated!: boolean;
  nome!: string | null;
  persone: any;
  arraySideBarButtons: any = [];

  @Input() imgUtente!: string;
  @Input() cerca!: boolean;
  @Output() OnChangeString = new EventEmitter<string>();
  @Output() idKeyDaVisitare = new EventEmitter<string>();
  @Output() idKeyDiChiVisita = new EventEmitter<string>();
  @Output() visit = new EventEmitter<string>();
  @Input() notifiche: any=[];
  @Input()notificheDaLeggere!: number;
  @Input()notificheLette:any=[]
  @Input() utente:any
  notifics!:boolean
  @Output() color= new EventEmitter<string>()
  bg: string='bg-light'
  text: string='text-dark'

  constructor(
    private spinner: NgxSpinnerService,
    private at: AuthService,
    private ss: ServiziService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cerca = false;
    this.nome = localStorage.getItem('nome');
    this.isAuthenticated = this.at.isLoggedIn ? true : false;
    this.notifics = false;
    this.arraySideBarButtons = [
      {
        icon: 'home',
        value: 'Home',
      },
      {
        icon: 'person',
        value: 'Profilo',
      },
      {
        icon: 'search',
        value: 'Cerca',
      },
      {
        icon: 'chat',
        value: 'Chat',
      },
      {
        icon: 'query_stats',
        value: 'Statistiche',
      },
      {
        icon: 'favorite',
        value: 'Notifiche',
      },
      {
        icon:'invert_colors',
        value:'toggle'
      },
      {
        icon: 'subdirectory_arrow_right',
        value: 'Logout',
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cerca = false;
  }

  onChangeStr(a: any) {
    if (a == 'Logout') {
      this.logOut();
    } else if (a == 'Cerca') {
      this.cerca = !this.cerca;
      this.notifics=false
    } else if (a == 'Notifiche') {
      this.notifics = !this.notifics;
      this.cerca=false
    } else if (a == 'visitProfilo') {
      this.spinner.show();
      this.cerca = false;
      this.notifics=false
      this.OnChangeString.emit(a);
    }else if (a == 'toggle') {
      this.spinner.hide()
    }
    else {
      this.spinner.show();
      this.cerca = false;
      this.notifics=false
      this.OnChangeString.emit(a);
      this.visit.emit('');
    }
    this.cdr.detectChanges;
  }

  logOut() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.ss.getUsers().subscribe((data: any) => {
      Object.keys(data).map((key) => {
        if (data[key].email == localStorage.getItem('email')) {
          this.ss
            .isOnlineUser(
              'https://nuovoprogetto-fe8d2-default-rtdb.europe-west1.firebasedatabase.app/persone',
              key,
              {
                isOnline: false,
              }
            )
            .subscribe((data: any) => {
              this.at.isLoggedIn = false;
              localStorage.clear();
              this.router.navigate(['signup']);
            });
        }
      });
    });
  }
  onReceiveIdKeyDaVisitare(a: any) {
    this.idKeyDaVisitare.emit(a);
  }
  onReceiveIdKeyDiChiVisita(a: any) {
    this.idKeyDiChiVisita.emit(a);
  }
  onReceiveVisit(a: any) {
    this.visit.emit('ok');
  }
  onChangeToggle(event:any){
    if(event.checked==true){
      this.color.emit('bg-dark')
      this.bg='bg-dark'
      this.text='text-white'
    }else if(event.checked==false){
      this.color.emit('bg-light')
      this.text='text-dark'
      this.bg='bg-light'
    }

  }
}
