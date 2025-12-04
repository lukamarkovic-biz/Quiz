import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Highscore } from '../../models/highscores';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  private apiUrl = 'http://localhost:3000/highscores';

  constructor(private http: HttpClient) {}

  getHighscores(): Observable<Highscore[]> {
    return this.http.get<Highscore[]>(this.apiUrl);
  }
  
  setHighscore(highscore: Highscore): Observable<Highscore> {
    return this.http.post<Highscore>(this.apiUrl, highscore);
  }
}
