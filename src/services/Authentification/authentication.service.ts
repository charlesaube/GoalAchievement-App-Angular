import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../../app/model/user.model';
import {environment} from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private user: User;


  constructor(private http: HttpClient,   private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


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

    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.apiUrl}/user/authenticate`, { email, password }, {observe: 'response' as 'body'})
      .pipe(map(user => {
        this.user = user.body;
        console.log(user);
        if (this.user.userId != null)
        {
          this.router.navigate(['/']);
          console.log('User is connected');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }

      }));

  }

}
