import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  private API_URL = environment.apiUrl + '/objectif';

  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':localStorage.getItem("token")
    }),
    observe: 'response' as "body"
  };

  constructor( private http: HttpClient) { }

  getAllObjectif(): Observable<any>
  {
    return this.http.get(`${this.API_URL}/all`, this.optionRequete);
  }

  getObjectifByUserId(id: number): Observable<any>
  {
    return this.http.get(`${this.API_URL}/userId/` + id, this.optionRequete);
  }
  getObjectifByUserIdAndCategoryId(userId: number, categoryId: number): Observable<any>
  {
    return this.http.get(`${this.API_URL}/UserAndCat/` + userId + '/' + categoryId, this.optionRequete);
  }
  postObjectif( objectifName: string, categoryId: number, endDate: string, userId: number): Observable<any>
  {

    // tslint:disable-next-line:max-line-length
    return this.http.post<ObjectifArticle>(`${this.API_URL}/add`, {objectifId: 0, objectifName,  startDate: new Date(endDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString().valueOf() , isAchieved: 0, categoryId, userId}, this.optionRequete);

  }
  deleteObjectif( id: number): Observable<any>
  {
    return this.http.delete(`${this.API_URL}/delete/` + id, this.optionRequete);
  }
}

interface ObjectifArticle {
  objectifId: number;
  objectifName: string;
  startDate: string;
  endDate: string;
  isAchieved: number;
  categoryId: number;
  userId: number;

}

