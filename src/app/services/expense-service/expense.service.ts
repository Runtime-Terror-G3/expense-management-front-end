import {IExpense} from '../../models/expense.model';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs';
import {ExpenseCategory} from "../../models/expense-category.enum";
import {StatisticTime} from "../../models/statistic-time";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = {headers: this.headers}

  constructor(private http: HttpClient) {
  }

  getAllExpenses(): Observable<IExpense[]> {
    let params = new HttpParams().set('category', 'All').set('startDate', '0').set('endDate', Date.now().toString());
    return this.http.get<IExpense[]>(this.baseUrl + 'get-expenses', {headers: this.headers, params: params});
  }

  getFilteredExpensesByCategory(category: string): Observable<IExpense[]> {
    let params = new HttpParams().set('category', category).set('startDate', '0').set('endDate', Date.now().toString());
    return this.http.get<IExpense[]>(this.baseUrl + 'get-expenses', {headers: this.headers, params: params});
  }

  getFilteredExpenses(category: string, startDate: Date, endDate: Date): Observable<IExpense[]> {
    let params = new HttpParams().set('category', category).set('startDate', startDate.getTime() / 1000).set('endDate', endDate.getTime() / 1000);
    return this.http.get<IExpense[]>(this.baseUrl + 'get-expenses', {headers: this.headers, params: params});
  }

  createExpense(amount: number, category: ExpenseCategory, date: Date): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-expense', {
      'amount': amount,
      'category': category,
      'date': date.toISOString(),
    }, this.options);
  }

  updateExpense(expenseId: number, amount: number, category: ExpenseCategory, date: Date): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'update-expense/' + expenseId, {
      'amount': amount,
      'category': category,
      'date': date.toISOString(),
    }, this.options);
  }

  deleteExpense(expenseId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'delete-expense/' + expenseId, this.options);
  }

  getStatisticsByCategory(userId:number, startDate:Date, endDate:Date):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}category-total?userId=${userId}&start=${startDate}&end=${endDate}`);
  }

  getStatisticsByTime(userId:number,granularity:string,startDate:Date, endDate:Date,category:string):Observable<any>{
    return this.http.get<StatisticTime>(`${this.baseUrl}total-expenses-in-time?userId=${userId}&granularity=${granularity}&startDate=${startDate}&endDate=${endDate}&category=${category}`);
  }
}
