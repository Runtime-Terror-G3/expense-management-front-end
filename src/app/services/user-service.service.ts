import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
})

private options = {headers: this.headers}

constructor(private http: HttpClient) { }

createAccount(user:IUser):Observable<IUser>{
  const body = JSON.stringify(user);
  return this.http.post<IUser>(this.baseUrl + '/createAccount', body, this.options);
}

}
