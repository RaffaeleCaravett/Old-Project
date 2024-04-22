import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FatherOfAllRoutingModule } from './father-of-all-routing.module';
import { FatherOfAllComponent } from './father-of-all.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { ProfiloComponent } from '../profilo/profilo.component';
import { CustomFilterPipe } from '../home/pipe/custom-filter-pipe.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VisitProfilesComponent } from '../visit-profiles/visit-profiles.component';
import { ChatConUtentiComponent } from '../chat-con-utenti/chat-con-utenti.component';
import { ChatConUtenteComponent } from '../chat-con-utenti/chat-con-utente/chat-con-utente.component';
import {  NgSimpleSidebarModule } from 'ng-simple-sidebar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CercaComponent } from '../cerca/cerca.component';
import { DialogForIterationsComponent } from '../../dialog/dialog-for-iterations/dialog-for-iterations.component';
import { DialogToViewStoriesComponent } from '../../dialog/dialog-to-view-stories/dialog-to-view-stories.component';
import { DialogToViewWhoViesStoriesComponent } from '../../dialog/dialog-to-view-who-vies-stories/dialog-to-view-who-vies-stories.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { OnHoverDialogComponent } from '../../dialog/on-hover-dialog/on-hover-dialog.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StatsComponent } from '../stats/stats.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxEchartsModule } from 'ngx-echarts';
import { NotificheComponent } from '../notifiche/notifiche.component';
import { MatBadgeModule } from "@angular/material/badge";
import {MatMenuModule} from '@angular/material/menu';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DirectiveDirective } from '../../directives/directive.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    FatherOfAllComponent,
    NavbarComponent,
    HomeComponent,
    ProfiloComponent,
    CustomFilterPipe,
    VisitProfilesComponent,
    ChatConUtentiComponent,
    ChatConUtenteComponent,
    CercaComponent,
    DialogComponent,
    DialogToViewStoriesComponent,
    DialogToViewWhoViesStoriesComponent,
    DialogForIterationsComponent,
    OnHoverDialogComponent,
    StatsComponent,
    NotificheComponent,
    DirectiveDirective
  ],
  imports: [
    CommonModule,
    FatherOfAllRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgSimpleSidebarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  NgxEchartsModule.forRoot({
    /**
     * This will import all modules from echarts.
     * If you only need custom modules,
     * please refer to [Custom Build] section.
     */
    echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
  }),
  MatBadgeModule,
  MatMenuModule,
  PickerModule,
  MatSlideToggleModule,
  ScrollingModule,


//  'AIzaSyDjt9NYA0d0nc7cRQZ29kcBlsFeM3trwfQ'



  ],
  providers:[

  ]
})

export class FatherOfAllModule {

}
