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
import { AddObjectifComponent } from './add-objectif/add-objectif.component';

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
    AddObjectifComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
