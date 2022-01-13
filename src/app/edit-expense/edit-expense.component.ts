import { MatSnackBar } from '@angular/material/snack-bar';
import {Component, OnInit} from '@angular/core';
import {ExpenseCategory} from "../models/expense-category.enum";
import {IExpense} from "../models/expense.model";
import {MatDialog} from "@angular/material/dialog";
import {
  UpdateExpenseDialogComponent,
  UpdateExpenseDialogData
} from "./update-expense-dialog/update-expense-dialog.component";
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
  categories: ExpenseCategory[] = [
    ExpenseCategory.Clothing,
    ExpenseCategory.Education,
    ExpenseCategory.Entertainment,
    ExpenseCategory.Food,
    ExpenseCategory.Health,
    ExpenseCategory.Housekeeping,
    ExpenseCategory.SelfCare,
    ExpenseCategory.Wishlist,
    ExpenseCategory.Other,
  ] as ExpenseCategory[];
  expenses: IExpense[] = [];

  category: string = 'All';
  startDate: string = '';
  endDate: string = ''

  constructor(
    public dialog: MatDialog,
    public expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.displayAllExpenses();
  }

  private displayAllExpenses() {
    this.expenseService.getAllExpenses().subscribe(
      (response: IExpense[]) => {
        this.expenses = response;
      },
      error => {
        this.snackBar!.open('Oops! We could not process your request, please try again.', '', {
          duration: 3000,
          panelClass: ['snackbar']
        });
      }
    );
  }

  displayFilteredExpenses() {
    if (this.startDate == '' && this.endDate == '') {
      this.expenseService.getFilteredExpensesByCategory(this.category).subscribe(
        (response: IExpense[]) => {
          this.expenses = response;
        },
        error => {
          this.snackBar!.open("Oops! We could not process your request, please try again.", '', {
            duration: 3000,
            panelClass: ['snackbar']
          });
        }
      );
    } else {
      this.expenseService.getFilteredExpenses(this.category, new Date(this.startDate), new Date(this.endDate)).subscribe(
        (response: IExpense[]) => {
          this.expenses = response;
        },
        error => {
          this.snackBar!.open("Oops! We could not process your request, please try again.", '', {
            duration: 3000,
            panelClass: ['snackbar']
          });
        }
      );
    }
  }

  openUpdateDialog(expense: IExpense) {
    const dialogRef = this.dialog.open(UpdateExpenseDialogComponent, {
      width: '1000px',
      data: {
        expenseId: expense.id,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      } as UpdateExpenseDialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.displayAllExpenses();
    });
  }

  openDeleteDialog(expense: IExpense) {
    const dialogRef = this.dialog.open(DeleteExpenseDialogComponent, {
      width: '500px',
      data: {
        expenseId: expense.id,
      } as DeleteExpenseDialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.displayAllExpenses();
    });
  }
}
