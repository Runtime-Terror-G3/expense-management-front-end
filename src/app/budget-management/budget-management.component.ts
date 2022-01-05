import { IMonthlyBudget } from './../models/monthly-budget.model';
import { SessionService } from './../services/session.service';
import { BudgetService } from './../services/budget-service/budget.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.css']
})

export class BudgetManagementComponent implements OnInit {
  monthlyBudgets: IMonthlyBudget[] = [] as IMonthlyBudget[];
  loggedUserId: number | undefined;
  currentMonthlyBudget: IMonthlyBudget = {
    "id": 0,
    "userId": 0,
    "income": 0,
    "date": new Date()
  } as IMonthlyBudget;
  currentDate: string | undefined;
  showModal = false;
  isAddMode = true;
  currentBudget: IMonthlyBudget = {} as IMonthlyBudget;

  form = new FormGroup({
    income: new FormControl(''),
    date: new FormControl('')
  });

  displayedColumns: string[] = ['date', 'income', 'actions'];

  get income() {
    return this.form.get('income') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  constructor(private budgetService: BudgetService, private sessionService: SessionService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loggedUserId = this.sessionService.getLoggedUserId()!;
    this.getMonthlyBudgetsFromCurrentYear();
  }

  createMonthlyBudget() {
    let budget = {
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget
    if(this.validateBudget(budget)) {
      this.budgetService.createMonthlyBudget(budget).subscribe(x => {this.getMonthlyBudgetsFromCurrentYear();});
      this.form.reset();
      this.showModal = false;
    }
  }

  delelteMonthlyBudget(budgetId: number) {
    this.budgetService.deleteMonthlyBudget(budgetId).subscribe(x => {this.getMonthlyBudgetsFromCurrentYear();});
  }

  updateMonthlyBudget() {
    let budget = {
      id: this.currentMonthlyBudget.id,
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget
    if(this.validateBudget(budget)) {
      this.budgetService.updateMonthlyBudget(budget).subscribe(x => {this.getMonthlyBudgetsFromCurrentYear();});
      this.form.reset();
      this.showModal = false;
    }
  }

  addRow() {
    this.showModal = true;
    this.isAddMode = true;
  }

  editRow(row: IMonthlyBudget) {
    this.currentMonthlyBudget = row;
    this.showModal = true;
    this.isAddMode = false;
  }

  deleteRow(row: IMonthlyBudget) {
    if(confirm("Are you sure to delete this item?")) {
      this.delelteMonthlyBudget(row.id);
    }
  }

  cancel() {
    this.showModal = false;
  }

  getMonthlyBudgetsFromCurrentYear() {
    let startDate = this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd');
    let endDate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31), 'yyyy-MM-dd');
    this.budgetService.getMonthlyBudgets(this.loggedUserId!, startDate!, endDate!)
      .subscribe(budgets => {this.monthlyBudgets = budgets.sort(
        (a, b) => {
          return <any>new Date(a.date) - <any>new Date(b.date);
        }
      ); this.getCurrentBudget();});
  }

  getCurrentBudget() {
    this.currentBudget = this.monthlyBudgets.filter(x => new Date(x.date).getUTCMonth() == new Date().getMonth())[0];
  }

  validateBudget(budget: IMonthlyBudget) {
      if (!budget.income || budget.income < 0) {
        alert('Invalid income field!');
        return false;
      }
      if (this.monthlyBudgets.filter(x => new Date(x.date).getUTCMonth() == new Date(budget.date).getUTCMonth() && x.id != budget.id).length >= 1)
      {
        alert('There is already a budget set for this month!');
        return false;
      }
      return true;
  }
}
