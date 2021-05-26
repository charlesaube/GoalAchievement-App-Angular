import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  private API_URL = environment.apiUrl + '/objectif';
  constructor( private http: HttpClient) { }

  getAllObjectif(): Observable<any>
  {
    return this.http.get(`${this.API_URL}/all`, {observe: 'response'});
  }
  getObjectifByUserId(id: number): Observable<any>
  {
    // tslint:disable-next-line:label-position

    // tslint:disable-next-line:label-position

    return this.http.get(`${this.API_URL}/userId/` + id, {observe: 'response'});
  }

  postObjectif( objectifName: string, categoryId: number, endDate: string, userId: number): Observable<any>
  {

    console.log(endDate);

    // tslint:disable-next-line:max-line-length
    return this.http.post<ObjectifArticle>(`${this.API_URL}/add`, {objectifId: 0, objectifName,  startDate: new Date().toLocaleDateString(), endDate: new Date().toLocaleDateString(), isAchivied: 0, categoryId, userId}, {observe: 'response'});

  }
  deleteObjectif( id: number): Observable<any>
  {
    return this.http.delete(`${this.API_URL}/delete/` + id, {observe: 'response'});
  }
}

interface ObjectifArticle {
  objectifId: number;
  objectifName: string;
  startDate: string;
  endDate: string;
  isAchivied: number;
  categoryId: number;
  userId: number;

}

