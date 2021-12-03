import {Component, OnInit} from '@angular/core';
import {ExpenseCategory} from "../models/expense-category.enum";
import {ExpenseService} from "../services/expense-service/expense.service";
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
  allExpenses: IExpense[] = [
    {userId: 1, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 2, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 3, amount: 1, category: ExpenseCategory.Entertainment, date: new Date()} as IExpense,
    {userId: 4, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 5, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 6, amount: 2, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 7, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 8, amount: 2, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 9, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 10, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 11, amount: 1, category: ExpenseCategory.Others, date: new Date()} as IExpense,
    {userId: 12, amount: 2, category: ExpenseCategory.Housekeeping, date: new Date()} as IExpense,
    {userId: 13, amount: 1, category: ExpenseCategory.SelfCare, date: new Date()} as IExpense,
    {userId: 14, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 15, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 16, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
  ] as IExpense[];
  expenses: IExpense[] = [
    {userId: 1, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 2, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 3, amount: 1, category: ExpenseCategory.Entertainment, date: new Date()} as IExpense,
    {userId: 4, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 5, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 6, amount: 2, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 7, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {userId: 8, amount: 2, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 9, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 10, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 11, amount: 1, category: ExpenseCategory.Others, date: new Date()} as IExpense,
    {userId: 12, amount: 2, category: ExpenseCategory.Housekeeping, date: new Date()} as IExpense,
    {userId: 13, amount: 1, category: ExpenseCategory.SelfCare, date: new Date()} as IExpense,
    {userId: 14, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {userId: 15, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {userId: 16, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
  ] as IExpense[];

  category: string = 'All';
  date: string = '';

  constructor(
    private expenseService: ExpenseService,
  ) {
  }

  ngOnInit(): void {
  }

  filterExpenses() {
    this.expenses.length = 0;
    for (let expense of this.allExpenses) {
      if (this.expenseCategory[expense.category] == this.category
        || this.category == 'All') {
        if (new Date(this.date).toLocaleDateString('en-US') == expense.date.toLocaleDateString('en-US')
          || this.date == '') {
          this.expenses.push(expense);
        }
      }
    }
  }

  openUpdateDialog(expense: IExpense) {
    alert("Updating " + expense.userId);
  }

  openDeleteDialog(expense: IExpense) {
    alert("Deleting " + expense.userId);
  }
}
