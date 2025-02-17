import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from "@angular/platform-browser";
import { ApiToken, SessionData, User } from "../models/app.models";
import { Router } from "@angular/router";
import { AppTools } from "../app.tools";
import { HttpApiClient } from "./httpapiclient.service";

@Injectable()
export class LoginService {
    private static authToken: string | undefined;
    private static user: User | undefined;
    backendEndpoint: string;
    private http: HttpApiClient;

    public static get ApiToken(): string | undefined {
        return 'debug'; //LoginService.authToken;
    }

    public static get User(): User | undefined {
        return LoginService.user;
    }

    constructor(http: HttpApiClient, @Inject('BACKEND_ENDPOINT') backendEndpoint: string, private sanitizer: DomSanitizer, private router: Router) {
        this.http = http;
        this.backendEndpoint = backendEndpoint;
    }

    logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Remove the Token from Everywhere!
            window.localStorage.removeItem('fiPortalAuthToken');
            LoginService.authToken = undefined;
            LoginService.user = undefined;
            resolve();
        });
    }

    login(logdata: any): Promise<SessionData> {
        return new Promise<SessionData>((resolve, reject) => {
            var newsession = {
                user: logdata.user,
                password: logdata.password
            };
            this.http.post<SessionData>(this.backendEndpoint + 'session', newsession)
                .subscribe({
                    next: ssdata => {
                        window.localStorage.setItem('fiPortalAuthToken', ssdata.token.token);

                        LoginService.authToken = ssdata.token.token;
                        LoginService.user = ssdata.user;

                        if (LoginService.user.b64Pic && LoginService.user.b64Pic.trim() != '')
                            LoginService.user.safePic = this.sanitizer.bypassSecurityTrustResourceUrl(LoginService.user.b64Pic);
                        else
                            LoginService.user.safePic = this.sanitizer.bypassSecurityTrustResourceUrl('assets/imgs/generic_user.svg');


                        resolve(ssdata);

                        // this.getSessionUser()
                        //     .then(usr => {
                        //         LoginService.user = usr;
                        //         resolve(usr);
                        //     })
                        //     .catch(error => {
                        //         reject(error);
                        //     });
                    },
                    error: error => {
                        reject(AppTools.getErrorObject(error));
                    }
                });
        });
    }

    getSessionUser(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.http.get<User>(this.backendEndpoint + 'session')
                .subscribe({
                    next: user => {
                        if (user.b64Pic && user.b64Pic.trim() != '')
                            user.safePic = this.sanitizer.bypassSecurityTrustResourceUrl(user.b64Pic);
                        else
                            user.safePic = this.sanitizer.bypassSecurityTrustResourceUrl('assets/imgs/generic_user.svg');

                        resolve(user);
                    },
                    error: error => {
                        reject(AppTools.getErrorObject(error));
                    }
                });
        });
    }

    checkSession(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if (!LoginService.authToken) {
                let newAuthToken = window.localStorage.getItem('fiPortalAuthToken');
                if (!newAuthToken) {
                    reject({
                        errorSource: 'Sesion',
                        statusDescription: 'Invalid Session!'
                    });
                    return;
                }
                else {
                    LoginService.authToken = newAuthToken;
                }
            }

            this.getSessionUser()
                .then(usr => {
                    LoginService.user = usr;
                    resolve(usr);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}