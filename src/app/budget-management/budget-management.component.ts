import { SessionService } from './../services/session.service';
import { BudgetService } from './../services/budget-service/budget.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMonthlyBudget } from '../models/monthly-budget.model';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.css']
})
export class BudgetManagementComponent implements OnInit {
  monthlyBudgets: IMonthlyBudget[] = [] as IMonthlyBudget[];
  loggedUserId: number | undefined;

  form = new FormGroup({
    income: new FormControl(''),
    date: new FormControl('')
  });

  get income() {
    return this.form.get('income') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  constructor(private budgetService: BudgetService, private sessionService: SessionService) { }

  ngOnInit() {
    this.loggedUserId = this.sessionService.getLoggedUserId()!;
    
    // this.budgetService.getMonthlyBudgets(this.loggedUserId, Date.now, Date.now)
  }

  createMonthlyBudget() {
    let budget = {
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget

    this.budgetService.createMonthlyBudget(budget).subscribe();
    this.form.reset();
  }

  delelteMonthlyBudget(budgetId: number) {
    this.budgetService.deleteMonthlyBudget(budgetId, this.loggedUserId!).subscribe();
  }

  updateMonthlyBudget(budgetId: number) {
    let budget = {
      id: budgetId,
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget

    this.budgetService.updateMonthlyBudget(budget).subscribe();
    this.form.reset();
  }
}
