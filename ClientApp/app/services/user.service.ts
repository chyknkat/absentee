import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../user';
import { ServiceBase } from './base.service';

@Injectable()
export class UserService extends ServiceBase {

    constructor(protected http: Http) { super(http); }

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
}