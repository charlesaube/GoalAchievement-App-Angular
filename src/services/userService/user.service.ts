import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.apiUrl + '/user';
  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':localStorage.getItem("token")
    }),
    observe: 'response' as "body"
  };
  constructor( private http: HttpClient, private router: Router) { }

  getAll(): Observable<any>
  {
    return this.http.get(`${this.API_URL}/all`, this.optionRequete);
  }

  postUser(email: string, password: string ): Observable<any>
  {
    return this.http.post(`${this.API_URL}/add`, { email, password }, this.optionRequete);
  }

  // tslint:disable-next-line:max-line-length typedef
  postUserComplete(userId: number, firstName: string, lastName: string, email: string, password: string, gender: string, coachId: number)
  {
    return this.http.post<UserArticle>(`${this.API_URL}/add`
      , { userId, firstName, lastName, email, gender, coachId, password }, this.optionRequete) .pipe(map(user => {
      console.log(user.firstName);
      if (user.userId != null)
      {
        this.router.navigate(['/login']);
        console.log('User is Created');
      }

    }));

  }

}
interface UserArticle {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  coachId: number;
  password: string;
}
