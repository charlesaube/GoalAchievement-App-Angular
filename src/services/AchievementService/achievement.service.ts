import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private API_URL = environment.apiUrl + '/achievement';
  constructor( private http: HttpClient) { }

  getAllAchievement(): Observable<any>
  {
    return this.http.get(this.API_URL, {observe: 'response'});
  }

  getAchievementByUserId(id: number): Observable<any>
  {
    return this.http.get(`${this.API_URL}/userId/` + id, {observe: 'response'});
  }
  postAchievement( title: string, description: string, categoryId: number, date: string, userId: number): Observable<any>
  {
    return this.http.post<AchievementArticle>(`${this.API_URL}/add`, {achievementId: 0, title, description,  date: new Date(date).toLocaleDateString().valueOf(),
      userId, categoryId}, {observe: 'response'});

  }
  deleteAchievementById( id: number): Observable<any>
  {
    return this.http.delete(`${this.API_URL}/delete/` + id, {observe: 'response'});
  }

}

interface AchievementArticle {
  achievementId: number;
  title: string;
  description: string;
  date: string;
  userId: number;
  categoryId: number;

}
