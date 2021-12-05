import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
import {StatisticTime} from "../models/statistic-time";

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() statistics?: StatisticTime[];
  @Input() granularity?: String;

  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Total expenses'},
  ];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: { responsive: boolean } = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.statistics.previousValue != undefined &&
      changes.statistics.previousValue != changes.statistics.currentValue) {

      this.lineChartLabels = [];
      this.lineChartData[0].data = [];

      this.statistics = this.statistics?.sort((a, b) => {
        return <any>new Date(a.dateTime) - <any>new Date(b.dateTime);
      });

      if (this.granularity === 'day') {
        this.statisticsForDay();
      } else if (this.granularity === 'month') {
        this.statisticsForMonth();
      } else if (this.granularity === 'year') {
        this.statisticsForYear();
      }
    }
  }

  private statisticsForDay() {
    this.statistics?.forEach(statistic => {
      this.lineChartData[0].data?.push(statistic.amount);
      this.lineChartLabels.push(statistic.dateTime.toString());
    })
  }

  private statisticsForMonth() {
    let monthsMap: Object = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };

    this.statistics?.forEach(statistic => {
      this.lineChartData[0].data?.push(statistic.amount);
      let monthNr: string = statistic.dateTime.toString().split("-")[1];
      this.lineChartLabels.push((monthsMap as any)[monthNr]);
    })
  }

  private statisticsForYear() {
    this.statistics?.forEach(statistic => {
      this.lineChartData[0].data?.push(statistic.amount);
      this.lineChartLabels.push(statistic.dateTime.toString().split("-")[0]);
    })
  }
}
