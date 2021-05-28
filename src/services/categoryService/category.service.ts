import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.apiUrl + '/category';
  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':localStorage.getItem("token")
    }),
    observe: 'response' as "body"
  };
  constructor( private http: HttpClient) { }

  getAllCategory(): Observable<any>{
    return this.http.get(`${this.API_URL}/all`, this.optionRequete);
  }
  getCategoryById(id: number): Observable<any>
  {
    return this.http.get(`${this.API_URL}/` + id, this.optionRequete);
  }


}
