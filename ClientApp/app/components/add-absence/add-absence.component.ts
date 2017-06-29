import { Component, Input } from '@angular/core';
import { Absence } from "../../absence";
import * as moment from 'moment';
declare var moment: any;

@Component({
    selector: 'add-absence',
    templateUrl: '/add-absence.component.html',
    styleUrls: ['/add-absence.component.css']
})
export class AddAbsenceComponent {
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public errorMessage: string = "";
    private tomorrow: Date = moment(new Date()).add('days', 1);
    @Input() absence: Absence = new Absence(this.tomorrow, this.tomorrow, "", "");

    public onAbsenceSubmit() {
        this.clearErrors();
        this.isSuccessful = false;

        if (this.absence.name.trim() === "") {
            this.setErrorMessage("Name cannot be blank.");
            return;
        }

        if (this.absence.fromDate < moment().add('days', 1)) {
            this.setErrorMessage("From date must be in the future");
            return;
        }

        if (this.absence.toDate < this.absence.fromDate) {
            this.setErrorMessage("To date must be later than from date.");
            return;
        }

        this.clearForm();
        this.setSuccess();
    }

    private clearForm(): void {
        this.absence.fromDate = void 0;
        this.absence.toDate = void 0;
        this.absence.name = "";
        this.absence.comments = "";
    }

    private setErrorMessage(message: string): void {
        this.errorMessage = message;
        this.hasError = true;
    }

    private setSuccess(): void {
        this.isSuccessful = true;
        setTimeout(() => {
            this.isSuccessful = false;
        }, 10000);
    }

    private clearErrors(): void {
        this.errorMessage = "";
        this.hasError = false;
    }
}