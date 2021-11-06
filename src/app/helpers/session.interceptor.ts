import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

@Injectable()
/**
 * Session related interceptor for http requests
 */
export class SessionInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService
  ) {
  }

  /**
   * Adds session related info to the intercepted http request
   * @param request the http request
   * @param next the http handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let sessionRequest = request;
    const token = this.sessionService.getToken();
    if (token != null)
      sessionRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    return next.handle(sessionRequest);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true}
];
