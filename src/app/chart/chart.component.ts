import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  constructor(private chartService: ChartService) {}

  chartData: ChartData = {
    labels: this.chartService.getLoginUsers(),
    datasets: [
      {
        data: this.chartService.getTotalNumFollowers(),
        label: 'Number of followers per user',
      },
    ],
  };
  public chartLabels: string[] = [
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'Purple',
    'Orange',
    'Grey',
  ];
  public chartOptions: any = {
    responsive: true,
  };
  public lineChartType = 'line';
}
