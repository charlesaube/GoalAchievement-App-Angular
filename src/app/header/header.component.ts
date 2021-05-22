import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentification/authentication.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'angular-projet-web';
  user: User;
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).body;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  // tslint:disable-next-line:typedef
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
