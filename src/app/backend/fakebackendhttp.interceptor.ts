import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: any[] = JSON.parse(localStorage.getItem('users')) ||
        [{
            id: 'fake-userid',
            userName: 'test',
            firstName: 'TEST',
            lastName: 'USER',
            password: 'test'
        }];

        return Observable.of(null).mergeMap(() => {

            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {

                const filteredUsers = users.filter(user => {
                    return user.userName === request.body.userName && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    const user = filteredUsers[0];
                    const body = {
                        idToken: 'fake-id-token',
                        accessToken: 'fake-jwt-token',
                        expiresIn: 50,
                        profile: {
                            id: user.id,
                            userName: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return Observable.throw('Username or password is incorrect');
                }
            }
            return next.handle(request);

        })
        .materialize()
        .delay(500)
        .dematerialize();
        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
    }
}
