import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:3000/questions';

  constructor(private http : HttpClient) { }
  getAll() {
    return this.http.get<Question[]>(this.apiUrl + '/find10');
  }
}
