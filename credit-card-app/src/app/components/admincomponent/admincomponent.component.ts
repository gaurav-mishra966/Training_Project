import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AlertcomponentComponent } from '../common-components/alertcomponent/alertcomponent.component';
import { UserManagementComponent } from '../adminComponents/user-management/user-management.component';
import { AdminsettingsComponent } from '../adminComponents/adminsettings/adminsettings.component';

@Component({
  selector: 'app-admincomponent',
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule,
    UserManagementComponent,
  ],
  templateUrl: './admincomponent.component.html',
  styleUrl: './admincomponent.component.scss',
})
export class AdmincomponentComponent {
  // Bar Chart Data for Admin Analytics (Revenue)
  barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [50000, 60000, 70000, 80000, 100000, 120000],
        label: 'Revenue (in Rs)',
      },
    ],
  };
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';

  // Line Chart Data for Active Users/Traffic
  lineChartLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [120, 140, 180, 200],
        label: 'Active Users',
        borderColor: '#4CAF50',
        fill: false,
      },
      {
        data: [80, 110, 130, 150],
        label: 'New Sign-ups',
        borderColor: '#FF5733',
        fill: false,
      },
    ],
  };
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartType: ChartType = 'line';

  // Pie Chart Data for Payment Distribution
  pieChartLabels = ['Payment Done', 'Payment Received'];
  pieChartData = [60, 40];
  pieChartType: ChartType = 'pie';

  // User Management Data
  users = [
    { id: 1, username: 'John Doe', status: 'Active' },
    { id: 2, username: 'Jane Smith', status: 'Inactive' },
    { id: 3, username: 'Robert Brown', status: 'Active' },
    { id: 4, username: 'Alice Green', status: 'Inactive' },
    { id: 5, username: 'Charlie White', status: 'Active' },
    { id: 6, username: 'Charlie White', status: 'Deleted' },
    // Add more users here for demo purposes
  ];

  filteredUsers = [...this.users]; // Users that will be displayed
  currentPage = 1;
  usersPerPage = 5;
  totalPages = Math.ceil(this.users.length / this.usersPerPage);
  searchQuery: string = '';
  sortField: string = '';
  sortDirection: boolean = true;

  handleUserAction(userId: number, currentStatus: string): void {
    // Toggle status based on the action
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      user.status = currentStatus === 'Active' ? 'Inactive' : 'Active';
    }
    this.updateFilteredUsers(); // Update filtered users to reflect status change
  }

  updateFilteredUsers(): void {
    this.filteredUsers = this.users
      .filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .slice(
        (this.currentPage - 1) * this.usersPerPage,
        this.currentPage * this.usersPerPage
      );
  }

  filterUsers(): void {
    this.currentPage = 1; // Reset to first page when filter changes
    this.updateFilteredUsers();
  }

  changePage(direction: string): void {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.updateFilteredUsers();
  }

  chartVisible = {
    revenue: false,
    userActivity: false,
    paymentDistribution: false,
  };

  toggleChart(chart: 'revenue' | 'userActivity' | 'paymentDistribution') {
    this.chartVisible[chart] = !this.chartVisible[chart];
  }
}
