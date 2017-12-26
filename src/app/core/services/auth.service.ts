import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private loggedIn: boolean;
  private loggedInBehaviourSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedInBehaviourSubject = new BehaviorSubject<boolean>(this.loggedIn);
  }

  login(userName: string, password: string): Observable<boolean> {
    const url = '/api/authenticate';
    this.http.post(url, { userName: userName, password: password })
      .toPromise()
      .then(this.handleLogin)
      .catch(this.handleError);
    return this.isLoggedInObserver();
  }

  private handleLogin(authResponse: any): any {
    this.createSession();
  }

  handleError(error: any): any {
    this.loggedInBehaviourSubject.next(error);
  }

  private createSession(): void {
    throw new Error('Method not implemented.');
  }

  private destroySession(): void {
    throw new Error('Method not implemented.');
  }

  isloggedIn() {
    return this.isloggedIn;
  }

  isLoggedInObserver(): Observable<boolean> {
    return this.loggedInBehaviourSubject.asObservable();
  }

  logout() {
    this.destroySession();
    throw new Error('Method not implemented.');
  }

}
