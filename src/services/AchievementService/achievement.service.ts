import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private API_URL = 'http://localhost:8080/api/achievement/all';
  constructor( private http: HttpClient) { }

  getAllAchievement(): Observable<any>
  {
    return this.http.get(this.API_URL, {observe: 'response'});
  }
}
