import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { App1Component } from './app1/app1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import {  MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorCatchingInterceptor } from './interceptor/app.interceptor';
import { NotFoundComponent } from './components/components/not-found/not-found.component';
import { DialogCommentiComponent } from './components/dialog/dialog-commenti/dialog-commenti.component';
import { DialogPostImageComponent } from './components/dialog/dialog-post-image/dialog-post-image.component';
import * as $ from 'jquery';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponents } from './shared-stuff/emoji/emoji.component';
import { CialogStoriesComponent } from './components/dialog/cialog-stories/cialog-stories.component';
import { AutocompleteComponent } from './shared-stuff/autocomplete/autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatMenuModule} from '@angular/material/menu';
import { DialogMusicComponent } from './components/dialog/dialog-music/dialog-music.component';
import { TextDialogComponent } from './components/dialog/text-dialog/text-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommentiCommentiComponent } from './components/dialog/commenti-commenti/commenti-commenti.component';
import { ShowCommCommAiCommentiComponent } from './components/dialog/show-comm-comm-ai-commenti/show-comm-comm-ai-commenti.component';

@NgModule({
  declarations: [
    AppComponent,
    App1Component,
    NotFoundComponent,
    DialogCommentiComponent,
    DialogPostImageComponent,
    ErrorDialogComponent,
    EmojiComponents,
    CialogStoriesComponent,
    AutocompleteComponent,
    DialogMusicComponent,
    TextDialogComponent,
    CommentiCommentiComponent,
    ShowCommCommAiCommentiComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    PickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    ColorPickerModule
  ],
  providers: [{
             provide: HTTP_INTERCEPTORS,
            useClass: ErrorCatchingInterceptor,
            multi: true},
     MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {
      provide: MatDialogRef,
      useValue: {}
    },

  ],

  bootstrap: [AppComponent],
  exports:[CialogStoriesComponent]
})
export class AppModule { }
