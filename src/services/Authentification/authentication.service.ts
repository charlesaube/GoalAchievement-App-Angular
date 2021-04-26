import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../../app/model/user.model';
import {environment} from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private user: User;
  public connected = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  /*
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }*/

  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  // authenticate
  // tslint:disable-next-line:typedef
  authenticate(email: string, password: string)
  {
    console.log('debut' + this.connected);
    this.http.post<any>(`${environment.apiUrl}/user/authenticate`, { email, password }, {observe: 'response' as 'body'})
      .subscribe( user => {
        this.connected = JSON.parse(user.body);
        if (this.connected)
        {
          // localStorage.setItem(email, JSON.stringify(email));
          console.log('User is connected');
          this.connected = true;
        }
      });
    // tslint:disable-next-line:triple-equals no-conditional-assignment
  }

}
