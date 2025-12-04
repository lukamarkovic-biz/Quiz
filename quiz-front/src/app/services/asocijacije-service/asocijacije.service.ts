import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AsocijacijaGame } from '../../models/asocijacije';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsocijacijeService {

  apiUrl = 'http://localhost:3000/associations';

  constructor(private http: HttpClient) {}

  getAsocijacija(): Observable<AsocijacijaGame> {
    return this.http.get<AsocijacijaGame>(this.apiUrl + '/random')
  }
}