import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {Observable} from "rxjs";

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a response when signing in', () => {
    expect(service.signIn('', '')).toBeInstanceOf(Observable);
  })

  it('should return a response when signing out', () => {
    expect(service.signOut()).toBeInstanceOf(Observable);
  })

  it('should save and get a token', () => {
    service.saveToken('token');
    expect(service.getToken()).toBe('token');
  })

  it('should get info about the active session', () => {
    service.saveToken('token');
    expect(service.activeSession()).toBeTrue();
  })
});
