import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { FakeBackendHttpInterceptor } from './fakebackendhttp.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        HttpModule,
    ],
    providers: [
        (() => {
            if (!environment.mockEnabled) {
                return;
            }
            return {
                provide: HTTP_INTERCEPTORS,
                useClass: FakeBackendHttpInterceptor,
                multi: true
            };
        })(),
        MockBackend,
        BaseRequestOptions
    ]
})

export class BackendModule { }
