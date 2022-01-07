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
    ExpenseCategory.Others,
  ] as ExpenseCategory[];

  date: string = new Date(this.data.date).toLocaleDateString('fr-CA');

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExpenseDialogData,
    private expenseService: ExpenseService,
  ) {
    this.date = new Date(this.data.date).toLocaleDateString('fr-CA');
  }

  onSave(): void {
    this.expenseService.updateExpense(this.data.expenseId, this.data.amount, this.data.category, new Date(this.date)).subscribe(
      () => {},
      error => {
        alert(error.message);
      }
    );
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
