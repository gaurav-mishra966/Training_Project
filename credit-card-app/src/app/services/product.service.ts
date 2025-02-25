import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        tap((response) => {})
      );
  }

  addProduct(product: Products) {
    return this.http.post(
      'https://localhost:7029/Product/addProduct',
      product,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
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

  updateProduct(product: Products) {
    console.log('UpdateProduct', product);
    const url = `${this.baseUrl}/Product/${product.id}`; // Make sure the endpoint matches your API route
    return this.http.put<Products>(url, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Product/${id}`).pipe(
      tap((response) => {
        console.log('Product deleted successfully', response);
        // Optionally, you can log any response or data from the API
      }),
      catchError((error) => {
        console.error('Error deleting product:', error); // Log the error if the request fails
        this.handleError(error); // Handle the error (e.g., show an alert or log it)
        throw error; // Rethrow the error so it can be caught in the component
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
