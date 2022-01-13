import { MatSnackBar } from '@angular/material/snack-bar';
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

  formDate: string = '';
  showModal = false;

  constructor(private expenseService: ExpenseService, public snackBar: MatSnackBar) { }

  get amount() {
    return (this.form.get('amount') as FormControl).value;
  }

  get category() {
    return (this.form.get('category') as FormControl).value;
  }

  get date() {
    return new Date(this.formDate);
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
    this.categories.push(ExpenseCategory.Wishlist);
    this.categories.push(ExpenseCategory.Other);
  }

  submitData() {
    var error_messages = "";
    if (!this.amount) {
      error_messages = "Amount is required!";
    }
    if (!this.date || new Date(this.date).toLocaleDateString('fr-CA') > new Date().toLocaleDateString('fr-CA'))
    {
      error_messages = `${error_messages} Date must be before today or today!`;
    }
    if (!this.category) {
      error_messages = `${error_messages} Category is required!`;
    }
    if (error_messages !== ''){
      this.snackBar!.open(error_messages, '', {
        duration: 3000,
        panelClass: ['snackbar']
      });
    } else {
    this.expenseService.createExpense(this.amount, this.category, this.date).subscribe(
      async () => {
        this.form.reset();
        this.showModal = true;
        await this.delay(2000);
        this.showModal = false;
      },
      error => {
        this.snackBar!.open(error, '', {
          duration: 3000,
          panelClass: ['snackbar']
        });
      }
    );
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
