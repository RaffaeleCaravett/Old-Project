import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FatherOfAllComponent } from './father-of-all.component';

const routes: Routes = [
  {
     path: '',
     component: FatherOfAllComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FatherOfAllRoutingModule { }
