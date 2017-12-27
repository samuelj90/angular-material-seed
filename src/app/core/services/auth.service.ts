import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { error } from 'util';

@Injectable()
export class AuthService {

  private loggedIn: boolean;
  private loggedInBehaviourSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedIn = JSON.parse(localStorage.getItem('logged_in')) ? true : false;
    this.loggedInBehaviourSubject = new BehaviorSubject<boolean>(this.loggedIn);
  }

  login(userName: string, password: string): Observable<boolean> {
    const url = '/api/authenticate';
    this.http.post(url, { userName: userName, password: password })
      .toPromise()
      .then((value) => { this.handleLogin(value); }, (reason) => { this.handleError(reason); });
    return this.isLoggedInObserver();
  }

  private handleLogin(authResponse: any): any {
    return this.createSession(authResponse);
  }

  private handleError(reason: any): any {
    this.loggedInBehaviourSubject.error(reason);
  }

  private createSession(authResponse: any): void {
    const expTime = authResponse.expiresIn * 1000 + Date.now();
    localStorage.setItem('token', authResponse.accessToken);
    localStorage.setItem('id_token', authResponse.idToken);
    localStorage.setItem('profile', JSON.stringify(authResponse.profile));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    localStorage.setItem('logged_in', JSON.stringify(this.loggedIn));
    this.loggedInBehaviourSubject.next(true);
  }

  private destroySession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('logged_in');
    this.loggedInBehaviourSubject.next(false);
  }

  isloggedIn() {
    console.log(this.loggedIn);
    return this.loggedIn;
  }

  isLoggedInObserver(): Observable<boolean> {
    return this.loggedInBehaviourSubject.asObservable();
  }

  logout(): Observable<boolean> {
    this.destroySession();
    return this.isLoggedInObserver();
  }

  // TODO : Refactor if possible.
  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

}
