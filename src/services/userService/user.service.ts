import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private API_URL = 'http://localhost:8080/api/user/all';
  constructor( private http: HttpClient) { }

  getAll(): Observable<any>
  {
    return this.http.get(this.API_URL, {observe: 'response'});
  }
}
