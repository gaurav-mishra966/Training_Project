import { Component, OnInit } from '@angular/core';
import { service } from '../../../services/services.service';
import { ServicesOffered } from '../../../models/services.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AlertService } from '../../../services/alert.service';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-servicesoffered',
  imports: [DialogModule, TableModule, ButtonModule, CardModule, FormsModule],
  templateUrl: './servicesoffered.component.html',
  styleUrl: './servicesoffered.component.scss',
})
export class ServicesofferedComponent implements OnInit {
  servicesOfferd: ServicesOffered[] = [];
  id: number = 0;
  displayDialog: boolean = false;
  isEditing: boolean = false;

  constructor(
    private servicesService: service,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe({
      next: (response) => {
        // Check if the response is an array
        if (Array.isArray(response)) {
          // Update the servicesOffered array
          this.servicesOfferd = response;
          console.log(this.servicesOfferd);
        } else {
          this.alertService.showAlert(
            `Expected an array, but got:${JSON.stringify(response)}`,
            'alert-warning',
            true
          );
        }
      },
      error: (error) => {
        // Handle any error that occurs during the request
        console.error('Error fetching services:', error);
        alert('Failed to fetch services. Please try again later.');
      },
    });
  }

  editService(id: number) {}

  deleteService(id: number) {
    console.log('delete button prime clicked!');
  }

  openNew() {}

  cancel() {}

  InsertService() {}
}
