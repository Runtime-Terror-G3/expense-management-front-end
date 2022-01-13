import { MatSnackBar } from '@angular/material/snack-bar';
import {ExpenseCategory} from "../../models/expense-category.enum";
import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExpenseService} from "../../services/expense-service/expense.service";

export interface UpdateExpenseDialogData {
  expenseId: number;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}

@Component({
  selector: 'app-update-expense-dialog',
  templateUrl: './update-expense-dialog.component.html',
  styleUrls: ['./update-expense-dialog.component.css']
})
export class UpdateExpenseDialogComponent {
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

  date: string = new Date(this.data.date).toLocaleDateString('fr-CA');

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExpenseDialogData,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {
    this.date = new Date(this.data.date).toLocaleDateString('fr-CA');
  }

  onSave(): void {
    this.expenseService.updateExpense(this.data.expenseId, this.data.amount, this.data.category, new Date(this.date)).subscribe(
      () => {},
      error => {
        this.snackBar!.open("Oops! We could not process your request, please try again.", '', {
          duration: 3000,
          panelClass: ['snackbar']
        });
      }
    );
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
