import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule,MatButtonModule,MatInputModule,MatRippleModule,MatTableModule,MatPaginatorModule,
MatSortModule,MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
//import {FullCalendarModule} from 'primeng/fullcalendar';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { FullCalenderComponent } from './full-calender/full-calender.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AddeditUserComponent,
    LoginFormComponent,
    HomePageComponent,
    CustomPaginationComponent,
    FullCalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
