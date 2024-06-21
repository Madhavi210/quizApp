import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from '../models/result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private apiUrl = 'http://localhost:3000/api/result';
  constructor(private http:HttpClient) { }

  createResult(resultData: any): Observable<IResult> {
    return this.http.post<IResult>(`${this.apiUrl}/${resultData.quizId}`, resultData);
  }

  getResultByQuizId(quizId: string): Observable<IResult> {
    return this.http.get<IResult>(`${this.apiUrl}/${quizId}`);
  }

}
