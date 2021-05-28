import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  public token:string;


  constructor(private http: HttpClient,   private router: Router) {

    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      }),
      observe: 'response' as 'body'
    };
    this.http.post<any>(`${environment.apiUrl}/login`, { username:'admin', password:'admin' },optionRequete).subscribe(resp => {
      this.token = resp.headers.get('Authorization');
      localStorage.setItem("token",this.token);
    });
    //environment.apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMzAzNTQzMX0.0jUb3vB01Zj8VW6wJiwbsaO1o7qqrpcWrO_v1Px7jf36C_Xlmi6Tnhfpr3gye5G9q5jXRtYJ0byXoA5rHwI4MA'
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
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Authorization':localStorage.getItem("token")
      }),
      observe: 'response' as 'body'
    };
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.apiUrl}/user/authenticate`, { email, password }, optionRequete)
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
