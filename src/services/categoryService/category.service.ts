import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.apiUrl + '/category';
  constructor( private http: HttpClient) { }

  getAllCategory(): Observable<any>{
    return this.http.get(`${this.API_URL}/all`, {observe: 'response'});
  }


}
