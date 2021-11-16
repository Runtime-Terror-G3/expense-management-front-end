import { ISidebarItem } from './../sidebar-item.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.css']
})
export class SidebarContainerComponent implements OnInit {
  @Output() closeSidebarButton = new EventEmitter<void>();

  sidebarElements: ISidebarItem[] = [] as ISidebarItem[];
  isSidebarActive = false;

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.sidebarElements = [
      {
        title: 'Dashboard',
        icon: 'ic-dashboard',
        route: '/home'
      },
      {
        title: 'Expense Management',
        icon: 'ic-expense',
        route: '/add-expense'
      },
      {
        title: 'Budget Management',
        icon: 'ic-budget',
        route: ''
      }
    ];
  }

  close() {
    this.closeSidebarButton.emit();
    this.isSidebarActive = !this.isSidebarActive;
  }

  changePage() {
    if(this.isSidebarActive == true) {
      this.isSidebarActive = false;
    }
  }
}
