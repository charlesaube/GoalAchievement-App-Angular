import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../services/Authentification/auth.guard';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {AppComponent} from './app.component';
import {UserPageComponent} from './user-page/user-page.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {path: 'userpage', component: UserPageComponent, canActivate: [AuthGuard] },
  {path: 'signup', component: SignupComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
