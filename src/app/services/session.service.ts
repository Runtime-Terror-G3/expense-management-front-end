import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import { sha256 } from 'js-sha256';
import  jwtDecode  from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
/**
 * Session related services, like signing up, in, out etc.
 */
export class SessionService {
  private apiUrl: string = environment.baseUrl;
  private token: string = '';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Signs in a user using the provided email and password.
   * Starts a new session.
   * @param email the email of the user
   * @param password the password associated with that email
   */
  signIn(email: string, password: string): Observable<any> {
    password = sha256(password)
    return this.httpClient.post(this.apiUrl + 'sign-in', {
      email,
      password
    }, httpOptions);
  }

  /**
   * Signs out the current user, ending the session.
   */
  signOut(): Observable<any> {
    window.sessionStorage.clear();
    return this.httpClient.get(this.apiUrl + 'sign-out', httpOptions);
  }

  /**
   * Saves a new session token by replacing the old one.
   * @param newToken the token to save
   */
  public saveToken(newToken: string): void {
    window.sessionStorage.removeItem(this.token);
    window.sessionStorage.setItem(this.token, newToken);
  }

  /**
   * Gets the current session token value.
   */
  getToken(): string | null {
    return window.sessionStorage.getItem(this.token);
  }

  getDecodedToken(): any {
    return jwtDecode(this.getToken()!);
  }

  getLoggedUserId(): number | null {
    return this.getDecodedToken().id;
  }

  getLoggedUserName(): string | null {
    return this.getDecodedToken().first_name + " " + this.getDecodedToken().last_name;
  }

  /**
   * Gets the status of the session (if it is active or not)
   */
  activeSession(): boolean {
    return this.getToken() != null;
  }
}
