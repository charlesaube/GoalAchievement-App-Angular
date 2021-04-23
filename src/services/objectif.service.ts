import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  private API_URL = 'http://localhost:8080/api/objectif/all';
  constructor( private http: HttpClient) { }

  getAllObjectif(): Observable<any>
  {
    return this.http.get(this.API_URL, {observe: 'response'});
  }
}
