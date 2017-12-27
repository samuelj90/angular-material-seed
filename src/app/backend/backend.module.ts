import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemUserService } from './inmemuser.service';
import { FakeBackendHttpInterceptor } from './fakebackendhttp.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemUserService),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendHttpInterceptor,
            multi: true
        }
    ]
})

export class BackendModule {
}
