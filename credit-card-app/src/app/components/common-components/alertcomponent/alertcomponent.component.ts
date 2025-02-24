import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { Alert } from '../../../models/alert.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alertcomponent',
  imports: [CommonModule],
  templateUrl: './alertcomponent.component.html',
  styleUrl: './alertcomponent.component.scss',
})
export class AlertcomponentComponent implements OnInit, OnDestroy {
  alert: Alert = {
    showAlert: false,
    alertMessage: '',
    alertType: 'alert-info',
    alertDuration: 5000,
  };
  private alertSubscription!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    // Subscribe to the alert service to listen for alert changes
    this.alertSubscription = this.alertService.alert$.subscribe(
      (alert: Alert) => {
        this.alert = alert;
      }
    );
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  closeAlert() {}
}
