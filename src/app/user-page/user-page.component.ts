import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: User;
  userService: UserService;
  constructor( ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).body;
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addObjectif(){

  }

}
