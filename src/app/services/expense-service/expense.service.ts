import {IExpense} from '../../models/expense.model';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {ExpenseCategory} from "../../models/expense-category.enum";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiExpenses: IExpense[] = [
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
  private nextId = 17;
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = {headers: this.headers}

  constructor(private http: HttpClient) {
  }

  getAllExpenses(): Observable<IExpense[]> {
    return of(this.apiExpenses);
    // return this.http.get<IExpense[]>(this.baseUrl + 'get-expenses', this.options);
  }

  getFilteredExpensesByCategory(category: string): Observable<IExpense[]> {
    let expenses: IExpense[] = [] as IExpense[];
    for (let expense of this.apiExpenses) {
      if (expense.category == category
        || category == 'All') {
        expenses.push(expense);
      }
    }
    return of(expenses);
    // let params = new HttpParams().set('category', category);
    // return this.http.get<Array<IExpense>>(this.baseUrl + 'get-expenses', {headers: this.headers, params: params});
  }

  getFilteredExpenses(category: string, date: Date): Observable<IExpense[]> {
    let expenses: IExpense[] = [] as IExpense[];
    for (let expense of this.apiExpenses) {
      if (expense.category == category
        || category == 'All') {
        if (date.toLocaleDateString('en-US') == expense.date.toLocaleDateString('en-US')) {
          expenses.push(expense);
        }
      }
    }
    return of(expenses);
    // let params = new HttpParams().set('category', category).set('date', date.toISOString());
    // return this.http.get<Array<IExpense>>(this.baseUrl + 'get-expenses', {headers: this.headers, params: params});
  }

  createExpense(amount: number, category: ExpenseCategory, date: Date): Observable<IExpense> {
    let expense: IExpense = {
      'expenseId': this.nextId++,
      'amount': amount,
      'category': category,
      'date': date
    } as IExpense;
    this.apiExpenses.push(expense);
    return of(expense);
    // return this.http.post<IExpense>(this.baseUrl + 'add-expense', {
    //   'expenseId': -1,
    //   'amount': amount,
    //   'category': category,
    //   'date': date,
    // }, this.options);
  }

  updateExpense(expenseId: number, amount: number, category: ExpenseCategory, date: Date): Observable<any> {
    let expense = this.apiExpenses.find(expense => expense.expenseId === expenseId);
    if (expense != undefined) {
      expense.amount = amount;
      expense.category = category;
      expense.date = date;
    }
    return of(expense);
    // return this.http.post<IExpense>(this.baseUrl + 'update-expense/' + expenseId, {
    //   'expenseId': expenseId,
    //   'amount': amount,
    //   'category': category,
    //   'date': date,
    // }, this.options);
  }

  deleteExpense(expenseId: number): Observable<any> {
    this.apiExpenses = this.apiExpenses.filter(function(value){
      return value.expenseId !== expenseId;
    });
    return of(null);
    // return this.http.delete<any>(this.baseUrl + 'delete-expense/' + expenseId, this.options);
  }
}
