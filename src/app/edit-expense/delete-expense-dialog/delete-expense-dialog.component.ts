import { MatSnackBar } from '@angular/material/snack-bar';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExpenseService} from "../../services/expense-service/expense.service";
import {UpdateExpenseDialogData} from "../update-expense-dialog/update-expense-dialog.component";

export interface DeleteExpenseDialogData {
  expenseId: number;
}

@Component({
  selector: 'app-delete-expense-dialog',
  templateUrl: './delete-expense-dialog.component.html',
  styleUrls: ['./delete-expense-dialog.component.css']
})
export class DeleteExpenseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExpenseDialogData,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) { }

  onNo(): void {
    this.dialogRef.close();
  }

  onYes(): void {
    this.expenseService.deleteExpense(this.data.expenseId).subscribe(
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
}
