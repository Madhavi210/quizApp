import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../models/user.model';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'}),
//   withCredentials: true
// }
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = ' http://localhost:3000/api/users'
  constructor(private http:HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl)
  }

  getUserById(id:string): Observable<IUser>{
    return this.http.get<IUser>(`${this.apiUrl}/${id}`)
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user)
    // .pipe(
    //   tap(response => {
    //     console.log("created user");
        
    //   })
    // )
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/edit/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // Server-side error
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // }
}

