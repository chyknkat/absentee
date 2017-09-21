import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
    private isLoggedInSubject = new Subject();

    public getLoginStatus() {
        return this.isLoggedInSubject.asObservable();
    }

    public updateLoginStatus(isLoggedIn: boolean) {
        this.isLoggedInSubject.next({isLoggedIn: isLoggedIn});
    }

}