import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { catchError, Observable, tap } from 'rxjs';
import { Products } from '../models/products';
import { errorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class productService {
  private baseUrl = 'https://localhost:7029/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private showAlert: AlertService
  ) {}

  getAllProducts(): Observable<{ products: Products[] }> {
    return this.http
      .get<{ products: Products[] }>(`${this.baseUrl}/Product`)
      .pipe(
        catchError((error) => {
          let errorMessage = '';
          if (error.status === 400) {
            errorMessage = 'Bad Response';
            this.showErrorAlert(errorMessage);
          }
          if (error.status === 401) {
            errorMessage = 'Un-Authorized';
            this.showErrorAlert(errorMessage);
          }
          if (error.status === 403) {
            errorMessage = 'For Bidden';
            this.showErrorAlert(errorMessage);
          }
          if (error.status === 404) {
            errorMessage = 'Not Found';
            this.showErrorAlert(errorMessage);
          }
          if (error.status === 408) {
            errorMessage = 'Not Found';
            this.showErrorAlert(errorMessage);
          }
          throw error;
        }),
        tap((response) => {
          console.log('service response', response);
        })
      );
  }

  addProduct(newProduct: Products): Observable<Products> {
    return this.http
      .post<Products>(`${this.baseUrl}/Product/addProduct`, newProduct)
      .pipe(
        tap((response) => {
          console.log('Product added successfully', response);
        }),
        catchError((error) => {
          let errorMessage = 'An error occurred while adding the product.';
          if (error.status === 400) {
            errorMessage = 'Bad Request: Please check the product data.';
          } else if (error.status === 500) {
            errorMessage = 'Internal Server Error: Something went wrong.';
          }
          this.showErrorAlert(errorMessage);
          throw error;
        })
      );
  }

  getProductById(id: number): Observable<Products> {
    console.log('edit Product');
    return this.http.get<Products>(`${this.baseUrl}/Product/${id}`).pipe(
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  updateProduct() {
    console.log('UpdateProduct');
  }

  deleteProduct(id: number): Observable<{ deletedProduct: Products[] }> {
    return this.http
      .delete<{ deletedProduct: Products[] }>(
        `${this.baseUrl}/Product/deleteProduct/${id}`
      )
      .pipe(
        tap((response) => {
          console.log('Product deleted successfully', response);
          // You can log or perform any actions with the deleted product details
          console.log('Deleted Product:', response.deletedProduct);
        }),
        catchError((error) => {
          this.handleError(error);
          throw error;
        })
      );
  }

  //Error Handeler
  // Generic error handling
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.status === 400) {
      errorMessage = 'Bad Request: Please check the product data.';
    } else if (error.status === 404) {
      errorMessage = 'Product not found.';
    } else if (error.status === 500) {
      errorMessage = 'Internal Server Error: Something went wrong.';
    }
    this.showErrorAlert(errorMessage);
  }

  //alert message
  showErrorAlert(message: string) {
    this.showAlert.showAlert(message, 'alert-error', true);
  }
}
