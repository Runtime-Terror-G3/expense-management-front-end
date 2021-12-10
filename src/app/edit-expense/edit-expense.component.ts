import {Component, OnInit} from '@angular/core';
import {ExpenseCategory} from "../models/expense-category.enum";
import {IExpense} from "../models/expense.model";
import {MatDialog} from "@angular/material/dialog";
import {UpdateExpenseDialogData, UpdateExpenseDialogComponent} from "./update-expense-dialog/update-expense-dialog.component";
import {
  DeleteExpenseDialogComponent,
  DeleteExpenseDialogData
} from "./delete-expense-dialog/delete-expense-dialog.component";
import {ExpenseService} from "../services/expense-service/expense.service";

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
    {expenseId: 1, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 2, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 3, amount: 1, category: ExpenseCategory.Entertainment, date: new Date()} as IExpense,
    {expenseId: 4, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 5, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 6, amount: 2, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 7, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 8, amount: 2, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 9, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 10, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 11, amount: 1, category: ExpenseCategory.Others, date: new Date()} as IExpense,
    {expenseId: 12, amount: 2, category: ExpenseCategory.Housekeeping, date: new Date()} as IExpense,
    {expenseId: 13, amount: 1, category: ExpenseCategory.SelfCare, date: new Date()} as IExpense,
    {expenseId: 14, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 15, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 16, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
  ] as IExpense[];
  expenses: IExpense[] = [
    {expenseId: 1, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 2, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 3, amount: 1, category: ExpenseCategory.Entertainment, date: new Date()} as IExpense,
    {expenseId: 4, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 5, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 6, amount: 2, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 7, amount: 1, category: ExpenseCategory.Food, date: new Date()} as IExpense,
    {expenseId: 8, amount: 2, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 9, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 10, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 11, amount: 1, category: ExpenseCategory.Others, date: new Date()} as IExpense,
    {expenseId: 12, amount: 2, category: ExpenseCategory.Housekeeping, date: new Date()} as IExpense,
    {expenseId: 13, amount: 1, category: ExpenseCategory.SelfCare, date: new Date()} as IExpense,
    {expenseId: 14, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
    {expenseId: 15, amount: 1, category: ExpenseCategory.Clothing, date: new Date()} as IExpense,
    {expenseId: 16, amount: 2, category: ExpenseCategory.Education, date: new Date()} as IExpense,
  ] as IExpense[];

  category: string = 'All';
  date: string = '';

  constructor(
    public dialog: MatDialog,
    public expenseService: ExpenseService,
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
    const dialogRef = this.dialog.open(UpdateExpenseDialogComponent, {
      width: '1000px',
      data: {
        expenseId: expense.expenseId,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      } as UpdateExpenseDialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(expense: IExpense) {
    const dialogRef = this.dialog.open(DeleteExpenseDialogComponent, {
      width: '500px',
      data: {
        expenseId: expense.expenseId,
      } as DeleteExpenseDialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
