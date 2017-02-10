import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Util } from './util';
import { UserService } from './user';

@Injectable()
export class HttpService {

    constructor(private http: Http, private util: Util, private userService: UserService) {

    }

    get(endpoint, params?) {
        let headers = new Headers({Authorization : this.userService.getUser().token});
        let requestOptions = new RequestOptions({headers: headers});
        let url = this.urlBuilder(endpoint, params);
        return this.http.get(url, requestOptions);
    }

    post(endpoint, params?, urlParams?, formData?) {
        console.log(formData);
        console.log(endpoint);

        let headers = new Headers({});
        let url = this.urlBuilder(endpoint, urlParams);
        if (formData === undefined) {
            headers = new Headers({Authorization : this.userService.getUser().token, 'Content-Type' : 'application/json'});
            let requestOptions = new RequestOptions({headers: headers});
            console.log("sending json data");
            return this.http.post(url, JSON.stringify(params), requestOptions);
        } else {
            console.log("sending form data");
            headers = new Headers({Authorization : this.userService.getUser().token});
            let requestOptions = new RequestOptions({headers: headers});

            return this.http.post(url, params, requestOptions);
        }
    }

    put(endpoint, params?, urlParams?) {
        let headers = new Headers({Authorization : this.userService.getUser().token, 'Content-Type' : 'application/json'});
        let requestOptions = new RequestOptions({headers: headers});
        let url = this.urlBuilder(endpoint, urlParams);
        return this.http.put(url, JSON.stringify(params), requestOptions);
    }

    delete(endpoint, params?) {
        let headers = new Headers({Authorization : this.userService.getUser().token});
        let requestOptions = new RequestOptions({headers: headers});
        let url = this.urlBuilder(endpoint, params);
        console.log(endpoint);
        console.log(url);

        return this.http.delete(url, requestOptions);
    }

    urlBuilder(endpoint, params?) {
        let url = this.util.host + endpoint;
        if (params !== null) {
            for (let key in params) {
               if (url.indexOf('?') === -1) {
                   url += '?' + key + '=' + params[key];
               } else {
                   url += '&' + key + '=' + params[key];
               }
            }
        }
        return url;
    }
}
