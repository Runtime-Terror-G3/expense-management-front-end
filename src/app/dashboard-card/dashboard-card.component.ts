import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input()
  action_title!: string;
  @Input()
  image_src!: string;
  @Input()
  action_route!: string;

  constructor() { 
  }

  ngOnInit() {
  }

}
