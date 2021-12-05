import { IExpense } from '../../models/expense.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  createExpense(expense: IExpense): Observable<IExpense> {
    const body = JSON.stringify(expense);
    return this.http.post<IExpense>(this.baseUrl + 'add-expense', body, this.options);
  }

  getStatisticsByCategory(userId:number, startDate:Date, endDate:Date):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}category-total?userId=${userId}&start=${startDate}&end=${endDate}`);
  }

  getStatisticsByTime(userId:number,granularity:string,startDate:Date, endDate:Date,category:string):Observable<any>{
    return this.http.get<StatisticTime>(`${this.baseUrl}total-expenses-in-time?userId=${userId}&granularity=${granularity}&startDate=${startDate}&endDate=${endDate}&category=${category}`);
  }
}
