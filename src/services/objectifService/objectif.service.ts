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
}
