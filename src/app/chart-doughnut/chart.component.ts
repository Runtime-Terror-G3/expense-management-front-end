import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChartType} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() statistics?: Object;
  noData?: boolean;

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [{
    backgroundColor: [
      "#D67AB1",
      "#A8DCD9",
      "#E7B1D0",
      "#F9B18B",
      "#65A9CD",
      "#8F9064",
      "#90648F",
      "#044E8B",
      "#CCF5AC"
    ]
  }];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    Object.keys(this.statistics!!).forEach(key => {
      this.doughnutChartLabels.push(key);
    })
    Object.values(this.statistics!!).forEach(value => {
      this.doughnutChartData.push(value);
    })
  }

}
