import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class HttpApiClient {

    constructor(private httpClient: HttpClient) { }

    createAuthorizationHeader(): HttpHeaders {
        let headers = new HttpHeaders();
        if (LoginService.ApiToken) {
            headers = headers
                .set('Authorization', `Bearer ${LoginService.ApiToken}`);
        }
        return headers;
    }

    get<T>(url: string) {
        return this.httpClient.get<T>(url, {
            headers: this.createAuthorizationHeader()
        });
    }

    post<T>(url: string, data: any) {
        return this.httpClient.post<T>(url, data, {
            headers: this.createAuthorizationHeader()
        });
    }

    put<T>(url: string, data: any) {
        return this.httpClient.put<T>(url, data, {
            headers: this.createAuthorizationHeader()
        });
    }

    delete<T>(url: string) {
        return this.httpClient.delete<T>(url, {
            headers: this.createAuthorizationHeader()
        });
    }
}