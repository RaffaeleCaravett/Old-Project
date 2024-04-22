import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/components/not-found/not-found.component';

const routes: Routes = [
  {
    path:"",
    component:SignupComponent
  },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule) },
  { path: 'fatherOfAll', loadChildren: () => import('./components/components/father-of-all/father-of-all.module').then(m => m.FatherOfAllModule),canActivate:[AuthGuard] },

  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
