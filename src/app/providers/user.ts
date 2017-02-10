import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Util } from './util';

export class User {
    token: string;
    name: string;
    email: string;
    isLoggedIn: boolean;
    objectId: string;
}

export class JWTHelper {

    private static getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
        return null;
        }

        let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }
    public static isTokenExpired(token: string, offsetSeconds?: number): boolean {
        let date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date == null) {
        return false;
        }

        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }


    private static decodeToken(token: string): any {
        let parts = token.split('.');

        if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
        }

        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
        throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
  }


    private static urlBase64Decode(str: string): string {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output: string = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
        throw new Error("atob' failed: The string to be decoded is not correctly encoded.");
        }

        for (
        // initialize result and counters
        let bc: number = 0, bs: any, buffer: any, idx: number = 0;
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
        }
        return output;
    }

}

@Injectable()
export class UserService {

    private tokenRefreshSubscription: Subscription;
    constructor(private http: Http, private util: Util) {
    }

    public login(email, password) {
        return new Observable(observer => {
            let payload = {
                username : email,
                password: password
            };

            let headers = new Headers({
                'Content-type' : 'application/json',
            });

            let requestOptions = new RequestOptions({headers : headers});

            this.http.post(this.util.host + '/auth', JSON.stringify(payload), requestOptions)
                .map(res => res.json())
                .subscribe(response => {
                    let token = 'JWT ' +  response.access_token;
                    let payload = {
                        username : email,
                        password: password
                    };


                    let headers = new Headers({
                        'Content-type' : 'application/json',
                        'Authorization' : token
                    });
                    let requestOptions = new RequestOptions({headers : headers});
                    this.http.get(this.util.host + '/api/me', requestOptions)
                        .map(res => res.json())
                        .subscribe(data => {
                            data = data.response;
                            console.log(data);
                            if (data.isInviteAccepted) {
                                this.setUser(data.name, data.email, token, data.objectId);
                                observer.next(data);
                            } else {
                                observer.error('Invite Not Accepted');
                            }
                        }, error => {
                            observer.error(error);
                        });
                });
        });
    }

    private setUser(name, email, token, objectId) {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        localStorage.setItem('objectId', objectId);
        console.log(token);

        this.startTokenRefreshService(token);
    }

    public getUser() {
        let user: User = new User();
        user.token = localStorage.getItem('token');
        if (localStorage.getItem('isLoggedIn') && !JWTHelper.isTokenExpired(user.token)) {

            if (!JWTHelper.isTokenExpired(user.token)) {
                user.name = localStorage.getItem('name');
                user.email = localStorage.getItem('email');
                user.objectId = localStorage.getItem('objectId');
                user.isLoggedIn = true;
            } else {
                console.log("error");
                throw new Error('Token Expired');
            }
        } else {
            user.isLoggedIn = false;
        }
        return user;
    }

    public startTokenRefreshService(token) {
        this.tokenRefreshSubscription = Observable
            .interval(480000)
            .subscribe(value => {
                this.refreshToken(token);
            });
    }

    public refreshToken(token) {
        console.log('done');

        if (!JWTHelper.isTokenExpired(token)) {
            let headers = new Headers({
                'Content-type' : 'application/json',
                'Authorization' : token
            });

            let requestOptions = new RequestOptions({headers : headers});
            this.http.get(this.util.host + '/auth/refresh', requestOptions)
                .map(res => res.json())
                .subscribe(response => {
                    localStorage.removeItem('token');
                    localStorage.setItem('token',  'JWT ' + response.token);
                }, error => {
                    localStorage.clear();
                    window.location.reload();
                    console.log(error);

                });
        }
    }

    public logout() {
        this.tokenRefreshSubscription.unsubscribe();
        localStorage.clear();
    }
}
