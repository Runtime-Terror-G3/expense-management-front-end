import {Component, OnInit} from '@angular/core';
import {ExpenseCategory} from "../models/expense-category.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {ExpenseService} from "../services/expense-service/expense.service";
import {SessionService} from "../services/session.service";
import {IExpense} from "../models/expense.model";

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseCategory = ExpenseCategory;
  categories: ExpenseCategory[] = [
    ExpenseCategory.Clothing,
    ExpenseCategory.Education,
    ExpenseCategory.Entertainment,
    ExpenseCategory.Food,
    ExpenseCategory.Health,
    ExpenseCategory.Housekeeping,
    ExpenseCategory.SelfCare,
    ExpenseCategory.Others,
  ] as ExpenseCategory[];
  form = new FormGroup({
    category: new FormControl(''),
    date: new FormControl('')
  });
  expenses: IExpense[] = [
    {userId: 1, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 2, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
  ] as IExpense[];

  constructor(
    private expenseService: ExpenseService,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
  }

  get category() {
    return this.form.get('category') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  filterExpenses() {

  }
}
