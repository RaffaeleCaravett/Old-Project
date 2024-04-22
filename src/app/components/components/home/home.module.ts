import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [

  ],


  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class HomeModule {

}
