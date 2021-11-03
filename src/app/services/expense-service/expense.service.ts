import { IExpense } from '../../models/expense.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

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
    return this.http.post<IExpense>(this.baseUrl + '/expenses', body, this.options);
  }
}
