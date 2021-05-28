import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private API_URL = environment.apiUrl + '/achievement';
  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':localStorage.getItem("token")
    }),
    observe: 'response' as "body"
  };

  constructor( private http: HttpClient) { }

  getAllAchievement(): Observable<any>
  {
    return this.http.get(this.API_URL, this.optionRequete);
  }

  getAchievementByUserId(id: number): Observable<any>
  {

    return this.http.get(`${this.API_URL}/userId/` + id, this.optionRequete);
  }
  postAchievement( title: string, description: string, categoryId: number, date: string, userId: number): Observable<any>
  {
    return this.http.post<AchievementArticle>(`${this.API_URL}/add`, {achievementId: 0, title, description,  date: new Date(date).toLocaleDateString().valueOf(),
      userId, categoryId}, this.optionRequete);

  }
  deleteAchievementById( id: number): Observable<any>
  {
    return this.http.delete(`${this.API_URL}/delete/` + id, this.optionRequete);
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
