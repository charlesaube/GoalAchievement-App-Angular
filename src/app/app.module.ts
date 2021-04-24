import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectifComponent } from './objectif/objectif.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AchievementComponent } from './achievement/achievement.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectifComponent,
    HeaderComponent,
    AchievementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
