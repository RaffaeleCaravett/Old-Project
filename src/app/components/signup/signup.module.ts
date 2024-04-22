import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon'
import { FatherOfAllModule } from '../components/father-of-all/father-of-all.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    FatherOfAllModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  entryComponents:[
DialogComponent
  ],
  providers:[
]
})
export class SignupModule { }
