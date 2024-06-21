import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IQuiz } from '../models/quiz.model';
import { IQuestion } from '../models/question.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = ' http://localhost:3000/api/quiz'
  constructor(private http:HttpClient) { }

  getQuiz(): Observable<IQuiz[]>{
    return this.http.get<IQuiz[]>(this.apiUrl)
  }

  getQuizById(id:string): Observable<IQuiz>{
    return this.http.get<IQuiz>(`${this.apiUrl}/${id}`)
  }

  createQuiz(title: IQuiz): Observable<IQuiz> {
    return this.http.post<IQuiz>(this.apiUrl, title)
  }

  submitQuiz(quizId: string, answers: any[]): Observable<any> {
    const url = `${this.apiUrl}/result/${quizId}`;
    return this.http.post<any>(url, { answers })
  }

}
