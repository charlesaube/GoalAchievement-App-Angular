import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/user';
  constructor( private http: HttpClient) { }

  getAll(): Observable<any>
  {
    return this.http.get(`${this.API_URL}/all`, {observe: 'response'});
  }

  postUser(email: string, password: string ): Observable<any>
  {
    return this.http.post(`${this.API_URL}/add`, { email, password }, {observe: 'response'});
  }
}
