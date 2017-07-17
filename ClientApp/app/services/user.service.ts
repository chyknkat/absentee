﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class UserService {
    private baseUrl: string = 'http://localhost:57055/';
    private headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    private options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get(this.baseUrl + 'User/GetAll', this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get(this.baseUrl + 'User/GetById/' + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addNewUser(user: User) {
        return this.http.post(this.baseUrl + 'User/New', user, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    }

    updateUser(user: User) {
        return this.http.put(this.baseUrl + 'User/Update', user, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    }

    toggleUserActiveFlag(userId: number, isActive: boolean) {
        return this.http.put(this.baseUrl + `User/ToggleActive/${userId}/${isActive}`, null, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private getResponse(res: Response) {
        return res.ok;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}