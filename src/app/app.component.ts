import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  numero:number=0
  maxCarrello!:string

  obs!: any;
  observablePiu!:any
  observableMeno!:any

constructor(private at:AuthService ,private title:Title){
}
  ngOnInit(): void {
this.title.setTitle('YourPlace')
  }


}
