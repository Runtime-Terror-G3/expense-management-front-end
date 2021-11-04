import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  signIn(email: string, password: string) {
    return this.httpClient.post(this.baseUrl + '/api/sign-in', {email, password}).pipe(shareReplay());
  }
}
