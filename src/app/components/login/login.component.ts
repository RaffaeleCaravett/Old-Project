import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { find } from 'rxjs';
import { ServiziService } from 'src/app/Servizi/servizi.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!:FormGroup
  error:string=''
  persone: any;
  personeArray:any[]=[]
  img!:string
  img2!:string
  constructor(private at:AuthService,private router:Router,private ss:ServiziService, private spinner: NgxSpinnerService,private cdr:ChangeDetectorRef){
  }

errs(value:any){
  this.error=''
  this.img2=''
  this.img='../../assets/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
  if(value!='password'&&value!=''){
  this.ss.getUsers().subscribe((data:any)=>{
    Object.keys(data).map((key:any)=>{
      if(data[key].email==value){
        this.img2=data[key].avatar
        this.img=''
      }
    })
  })
}else if(value==''){
  this.img2=''
  this.img='../../assets/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
}
this.cdr.markForCheck()
}

ngOnInit(): void {
  this.form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  this.img='../../assets/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
  this.img2=''
}



  onSbmt(){
    if(this.form.valid){

      this.ss.getUsers().subscribe((data:any)=>{
        this.persone=Object.keys(data).map((key)=>{return data[key]})

for (let persona of this.persone){
  persona.email==this.form.value.email?localStorage.setItem('email',this.form.value.email):console.log('ciao')
  }



  Object.keys(data).map((key)=>{


data[key].email==this.form.value.email?

this.ss.isOnlineUser('https://nuovoprogetto-fe8d2-default-rtdb.europe-west1.firebasedatabase.app/persone',key,{
  isOnline:true
}).subscribe((data:any)=>{
  console.log(data)
})
:''




  })



  })


this.at.signIn(
  {
   email:this.form.value.email,
   password:this.form.value.password,
   returnSecureToken:true
  }).subscribe(
  (data:any) => {
    const expirationDate =new Date (new Date().getTime() + data.expiresIn * 1000)
      this.at.createUser (data.email,data.localId,data.idToken,expirationDate)
    localStorage.setItem('user',JSON.stringify(this.at.user))


  if(localStorage.getItem('user')){
    const user = JSON.parse(localStorage.getItem('user')||'{}')
    this.at.createUser(user.email,user.id,user._token,user._expirationDate)

  }


  this.ss.getUsers().subscribe((data:any)=>{
    this.persone=Object.keys(data).map((key)=>{return data[key]})
    this.personeArray=Object.keys(data).map((key)=>{return data[key]})

for (let persona of this.persone){

persona.email == this.form.value.email? this.setLocal(persona):'';

}


  this.at.isLoggedIn=true
this.form.reset()
this.ss.postVisitatori({visitor:1}).subscribe(data=>{
  this.spinner.show()
  this.router.navigate(['fatherOfAll'])
 })
  })
  }
 ,
 (err)=>{
this.error='Le credenziali che hai inserito sono errate'
 })

    }
}
setLocal(persona:any){
  localStorage.setItem('avatar',persona.avatar)
  localStorage.setItem('email',persona.email)
  localStorage.setItem('dataDiNascita',persona.dataDiNascita)
  localStorage.setItem('luogoDiNascita',persona.luogoDiNascita)
  localStorage.setItem('interessi',persona.interessi)
  localStorage.setItem('stato',persona.stato)
  localStorage.setItem('sesso',persona.sesso)
  localStorage.setItem('isOnline',persona.isOnline)
  localStorage.setItem('id',persona.id)
  localStorage.setItem('nome',persona.nome)
  localStorage.setItem('cognome',persona.cognome)
}
}
