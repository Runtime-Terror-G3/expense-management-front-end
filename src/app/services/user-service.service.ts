import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { sha256 } from "js-sha256";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  createAccount(firstName: string, lastName: string, dateOfBirth: Date, email: string, password: string): Observable<any> {
    password = sha256(password);
    return this.httpClient.post(this.apiUrl + 'create-account', {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      passwordHash: password
    }, {responseType: "text", headers: new HttpHeaders({"Content-Type": "application/json"})});
  }
}
