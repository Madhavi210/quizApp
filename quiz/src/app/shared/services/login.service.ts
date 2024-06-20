import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/users';
  private isAuthenticated: Boolean = false;
  constructor(private http:HttpClient) { }
  private token?:string | null = null;

  login(credentials: {userNameOrEmail:string, password:string}): Observable<IUser>{
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
         this.token = response.token;
        if(this.token){
        this.saveToken(this.token);
        this.isAuthenticated = true;
        }
      })
    )
  }
  
  private saveToken(token: string): void {
    localStorage.setItem('token', token); // Store token in local storage
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  getHeaders() {
    const token = this.getToken()
    if (token) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    } else {
      return {
        headers: new HttpHeaders()
      };
    }
  }

  isloggedin(){
    return this.isAuthenticated;
  }
  
}





