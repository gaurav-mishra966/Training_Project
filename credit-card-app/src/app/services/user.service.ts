import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { Alert } from '../models/alert.model';
import { TestRequest } from '@angular/common/http/testing';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private baseUrl = 'https://localhost:7029/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private showAlert: AlertService
  ) {}

  //alert message
  showErrorAlert(message: string) {
    this.showAlert.showAlert(message, 'alert-error', true);
  }

  getUsers(): Observable<{ totalCount: number; users: User[] }> {
    return this.http
      .get<{ totalCount: number; users: User[] }>(`${this.baseUrl}/Users`)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Request cannot be processed!';
          if (error.status === 400) {
            this.showErrorAlert(errorMessage);
          }
          throw error; // Rethrow the error
        }),
        tap((response) => {})
      );
  }

  // currentUser(email: string): Observable<User> {
  //   return this.http
  //     .post<User>(`${this.baseUrl}/Auth/user/`, { email }) // Assuming the backend has /Users/login endpoint
  //     .pipe(
  //       catchError((error) => {
  //         let errorMessage = 'Login request failed!';
  //         if (error.status === 400) {
  //           errorMessage = 'Invalid credentials. Please try again.';
  //         } else if (error.status === 401) {
  //           errorMessage = 'Unauthorized. Please check your credentials.';
  //         }
  //         this.showErrorAlert(errorMessage);
  //         throw error; // Rethrow the error
  //       }),
  //       tap((response) => {
  //         console.log('User details fetched successfully', response);
  //       })
  //     );
  // }

  currentUser(email: string): Observable<User> {
    // Make a GET request with the email as a query parameter
    return this.http.get<User>(`${this.baseUrl}/Auth/user/${email}`);
  }
}
