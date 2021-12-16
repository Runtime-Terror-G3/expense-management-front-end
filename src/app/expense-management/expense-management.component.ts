import { Component, OnInit } from '@angular/core';
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrls: ['./expense-management.component.css']
})
export class ExpenseManagementComponent implements OnInit {
  optionMenu = 'AddExpense';

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (!this.sessionService.activeSession())
      this.toSignIn();
  }

  toSignIn() {
    this.router.navigate(["sign-in"]).then(() => {})
  }
}
