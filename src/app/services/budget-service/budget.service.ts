import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { IMonthlyBudget } from 'src/app/models/monthly-budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private options = {headers: this.headers}

  constructor(private http: HttpClient) { }

  updateMonthlyBudget(monthlyBudget: IMonthlyBudget): Observable<IMonthlyBudget> {
    const body = JSON.stringify(monthlyBudget);
    return this.http.put<IMonthlyBudget>(this.baseUrl + 'update-monthly-budget/' + monthlyBudget.id, body, this.options);
  }

  createMonthlyBudget(monthlyBudget: IMonthlyBudget): Observable<IMonthlyBudget> {
    const body = JSON.stringify(monthlyBudget);
    return this.http.post<IMonthlyBudget>(this.baseUrl + 'add-monthly-budget', body, this.options);
  }

  deleteMonthlyBudget(budgetId: number, userId: number): Observable<IMonthlyBudget> {
    return this.http.delete<IMonthlyBudget>(this.baseUrl + 'delete-monthly-budget/' + budgetId + '/' + userId, this.options);
  }

  getMonthlyBudgets(userId: number, startDate: string, endDate: string): Observable<IMonthlyBudget[]> {
    return this.http.get<IMonthlyBudget[]>(`${this.baseUrl}get-monthly-budgets?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
  }
}
