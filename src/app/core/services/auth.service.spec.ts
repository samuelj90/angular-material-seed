import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should pass a valid login', inject([AuthService], (service: AuthService) => {

  }));

  it('should not pass a invalid login', inject([AuthService], (service: AuthService) => {

  }));

});
