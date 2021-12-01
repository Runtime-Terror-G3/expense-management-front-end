import { IExpense } from '../../models/expense.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {IMonthlyBudget} from "../../models/monthly-budget.model";

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

  createExpense(expense: IExpense): Observable<IExpense> {
    const body = JSON.stringify(expense);
    return this.http.post<IExpense>(this.baseUrl + 'add-expense', body, this.options);
  }

  getStatisticsForPeriod(userId:number,startDate:Date, endDate:Date):Observable<any>{
    return this.http.get<IMonthlyBudget[]>(`${this.baseUrl}category-total?userId=${userId}&start=${startDate}&end=${endDate}`);

  }
}
