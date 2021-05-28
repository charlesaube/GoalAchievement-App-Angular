import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectifComponent } from './objectif/objectif.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AchievementComponent } from './achievement/achievement.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CoachPageComponent } from './coach-page/coach-page.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ObjectifComponent,
    HeaderComponent,
    AchievementComponent,
    LoginComponent,
    UserPageComponent,
    CoachPageComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
