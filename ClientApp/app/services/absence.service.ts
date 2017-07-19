import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Absence } from '../absence';
import { ServiceBase } from './base.service';

@Injectable()
export class AbsenceService extends ServiceBase {
    
    constructor(protected http: Http) { super(http)}

    getAllAbsences(): Observable<Absence[]> {
        return this.http.get(this.baseUrl + 'Absence/GetAll', this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAbsencesByUser(userId: number): Observable<Absence[]> {
        return this.http.get(this.baseUrl + 'Absence/GetByUser/' + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAbsenceById(absenceId: number): Observable<Absence> {
        return this.http.get(this.baseUrl + `Absence/GetById/${absenceId}`, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addNewAbsence(absence: Absence) {
        return this.http.post(this.baseUrl + 'Absence/New', absence, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    } 

    updateAbsence(absence: Absence) {
        return this.http.put(this.baseUrl + 'Absence/Update', absence, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    }

    toggleAbsenceActiveFlag(absenceId: number, isActive: boolean) {
        return this.http.put(this.baseUrl + `Absence/ToggleActive/${absenceId}/${isActive}`, null, this.options)
            .map(this.getResponse)
            .catch(this.handleError);
    }
    
}