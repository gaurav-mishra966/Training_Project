import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();

  constructor() {}
  showAlert(
    message: string,
    alertType:
      | 'alert-success'
      | 'alert-error'
      | 'alert-warning'
      | 'alert-info' = 'alert-info',
    showAlert: true,
    alertDuration: number = 5000
  ) {
    const alert: Alert = {
      showAlert: true,
      alertMessage: message,
      alertType: alertType,
      alertDuration: alertDuration,
    };
    this.alertSubject.next(alert);

    setTimeout(() => {
      this.hideAlert();
    }, alertDuration);
  }

  hideAlert() {
    this.alertSubject.next({
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-info',
      alertDuration: 5000,
    });
  }
}
