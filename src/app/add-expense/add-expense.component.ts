import { ExpenseCategory } from '../models/expense-category.enum';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpenseService } from '../services/expense-service/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  categories: ExpenseCategory[] = [] as ExpenseCategory[];
  expenseCategory = ExpenseCategory;
  form = new FormGroup({
    amount: new FormControl(''),
    category: new FormControl(''),
    date: new FormControl('')
  });

  constructor(private expenseService: ExpenseService) { }

  get amount() {
    return this.form.get('amount') as FormControl;
  }

  get category() {
    return this.form.get('category') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  ngOnInit() {
    this.createCategoryList();
  }

  createCategoryList() {
    this.categories.push(ExpenseCategory.Clothing);
    this.categories.push(ExpenseCategory.Education);
    this.categories.push(ExpenseCategory.Entertainment);
    this.categories.push(ExpenseCategory.Food);
    this.categories.push(ExpenseCategory.Health);
    this.categories.push(ExpenseCategory.Housekeeping);
    this.categories.push(ExpenseCategory.SelfCare);
    this.categories.push(ExpenseCategory.Others);
  }

  submitData() {
    this.expenseService.createExpense(this.amount.value, this.category.value, this.date.value).subscribe();
    this.form.reset();
  }
}
