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

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExpenseDialogData,
    private expenseService: ExpenseService,
  ) { }

  onSave(): void {
    this.expenseService.updateExpense(this.data.expenseId, this.data.amount, this.data.category, this.data.date);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
