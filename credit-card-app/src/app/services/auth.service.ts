import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { Alert } from '../models/alert.model';
import { TestRequest } from '@angular/common/http/testing';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7029/api';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');
  private UserEmail = new BehaviorSubject<string>('');
  private userType = new BehaviorSubject<string>('');
  private userRoles = new BehaviorSubject<string[]>([]);
  private jwtToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private showAlert: AlertService
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get currentUserName() {
    return this.userName.asObservable();
  }
  get currentUserType() {
    return this.userType.asObservable();
  }

  getLoginStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }

  getUserRole(): Observable<string> {
    return this.userType.asObservable();
  }
  //alert message
  showErrorAlert(message: string) {
    this.showAlert.showAlert(message, 'alert-warning', true);
  }

  login(username: string, password: string) {
    const loginData = { email: username, password: password };
    return this.http
      .post<any>(`${this.baseUrl}/Auth/validateUser/login`, loginData)
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown error occurred.';
          if (error.status === 400) {
            this.showErrorAlert(errorMessage);
          }
          return error.status;
        }),
        tap((response) => {
          const userRole = response.roles; // Adjust this field to match your API response
          const userEmail = response.email;
          localStorage.setItem('UserEmailId', userEmail);
          const userName = response.name; // Adjust this field to match your API response

          // Update the BehaviorSubjects with the new values
          this.userType.next(userRole);
          this.userName.next(userName);
          this.UserEmail.next(userEmail);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.http.post(`${this.baseUrl}/auth/logout`, {}).subscribe(
      (response) => {
        this.getLoginStatus();
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle logout error if needed
        console.error('Logout failed:', error);
        this.router.navigate(['']);
      }
    );
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  setUserName(username: string): void {
    this.userName.next(username);
  }

  setUserEmail(useremail: string): void {
    this.UserEmail.next(useremail);
  }

  setUserType(usertype: string): void {
    this.userType.next(usertype);
  }

  setUserRole(roles: string[]): void {
    this.userRoles.next(roles); // Assuming this is a BehaviorSubject
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auth/reset-password`, {
      email,
      newPassword,
    });
  }
}
