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
export class errorService {
  constructor(private alert: AlertService) {}

  showError(message: string): void {
    this.alert.showAlert(message, 'alert-info', true);
  }

  logError(error: any): void {
    console.error('Error occurred:', error);
    // You can extend this to send errors to a backend logging service
  }

  handleError(error: any): void {
    this.logError(error);

    // Depending on the error type, you can show different messages
    if (error.status === 404) {
      this.showError('Resource not found.');
    } else if (error.status === 500) {
      this.showError('Server error. Please try again later.');
    } else {
      this.showError('An unexpected error occurred. Please try again.');
    }
  }
}
