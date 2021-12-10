import { IExpense } from '../../models/expense.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {ExpenseCategory} from "../../models/expense-category.enum";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private options = {headers: this.headers}

  constructor(private http: HttpClient) { }

  createExpense(amount: number, category: ExpenseCategory, date: Date): Observable<IExpense> {
    alert('creating');
    return this.http.post<IExpense>(this.baseUrl + 'add-expense', {
      'expenseId': -1,
      'amount': amount,
      'category': category,
      'date': date,
    }, this.options);
  }

  updateExpense(expenseId: number, amount: number, category: ExpenseCategory, date: Date): Observable<IExpense> {
    alert('updating');
    return this.http.post<IExpense>(this.baseUrl + 'update-expense/' + expenseId, {
      'expenseId': expenseId,
      'amount': amount,
      'category': category,
      'date': date,
    }, this.options);
  }

  deleteExpense(expenseId: number): Observable<any> {
    alert('deleting');
    return this.http.delete<any>(this.baseUrl + 'delete-expense/' + expenseId, this.options);
  }
}
