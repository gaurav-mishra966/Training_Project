import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-homecomponent',
  imports: [CommonModule],
  templateUrl: './homecomponent.component.html',
  styleUrl: './homecomponent.component.scss',
})
export class HomecomponentComponent {
  // Chart Data for the bar chart (Total Revenue)
  barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [5000, 6000, 7000, 8000, 10000, 12000],
        label: 'Revenue (in Rs)',
      },
    ],
  };
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';

  // Chart Data for the line chart (Credit/Debit Trend)
  lineChartLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  lineChartData = [
    {
      data: [1000, 2000, 1500, 2500],
      label: 'Credit',
      borderColor: '#4CAF50',
      fill: false,
    },
    {
      data: [800, 1500, 1200, 1800],
      label: 'Debit',
      borderColor: '#FF5733',
      fill: false,
    },
  ];

  // Chart Data for the pie chart (Payment Distribution)
  pieChartLabels = ['Payment Done', 'Payment Received'];
  pieChartData = [50, 50];
  pieChartType = 'pie';
}
