import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { catchError, Observable, tap } from 'rxjs';
import { ServicesOffered } from '../models/services.model';
import { errorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class service {
  private baseUrl = 'https://localhost:7029/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private showAlert: AlertService
  ) {}

  //   getAllServices(): Observable<{ services: ServicesOffered[] }> {
  //     return this.http
  //       .get<{ services: ServicesOffered[] }>(`${this.baseUrl}/Service`)
  //       .pipe(
  //         catchError((error) => {
  //           let errorMessage = '';
  //           if (error.status === 400) {
  //             errorMessage = 'Bad Response';
  //             this.showAlert.showAlert(errorMessage, 'alert-error', true);
  //           }
  //           if (error.status === 401) {
  //             errorMessage = 'Un-Authorized';
  //             this.showAlert.showAlert(errorMessage, 'alert-error', true);
  //           }
  //           if (error.status === 403) {
  //             errorMessage = 'For Bidden';
  //             this.showAlert.showAlert(errorMessage, 'alert-error', true);
  //           }
  //           if (error.status === 404) {
  //             errorMessage = 'Not Found';
  //             this.showAlert.showAlert(errorMessage, 'alert-error', true);
  //           }
  //           if (error.status === 408) {
  //             errorMessage = 'Not Found';
  //             this.showAlert.showAlert(errorMessage, 'alert-error', true);
  //           }
  //           throw error;
  //         }),
  //         tap((response) => {
  //           console.log('response from services', response);
  //         })
  //       );
  //   }

  getAllServices(): Observable<ServicesOffered[]> {
    return this.http.get<ServicesOffered[]>(`${this.baseUrl}/Service`);
  }

  addProduct(service: ServicesOffered[]): Observable<ServicesOffered> {
    return this.http.post<ServicesOffered>(this.baseUrl, service);
  }

  updateProduct(product: ServicesOffered): Observable<ServicesOffered> {
    return this.http.put<ServicesOffered>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
