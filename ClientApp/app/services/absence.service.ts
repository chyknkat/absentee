import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Absence} from '../absence';

@Injectable()
export class AbsenceService {
    private baseUrl: string = 'http://localhost:57055/';

    constructor(private http: Http) { }

    getAllAbsences(): Observable<Absence[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + 'Absence/GetAll', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addNewAbsence(absence: Absence) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'Absence/New', absence, options)
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
        // In a real world app, you might use a remote logging infrastructure
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