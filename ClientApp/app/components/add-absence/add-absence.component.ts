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

        if (this.absence.firstName.trim() === "") {
            this.setErrorMessage("Name cannot be blank.");
            return;
        }

        if (this.absence.startDate < moment().add('days', 1)) {
            this.setErrorMessage("Start Date must be in the future");
            return;
        }

        if (this.absence.endDate <= this.absence.startDate) {
            this.setErrorMessage("Back in Office Date must be later than Start Date.");
            return;
        }

        this.clearForm();
        this.setSuccess();
    }

    private clearForm(): void {
        this.absence.startDate = void 0;
        this.absence.endDate = void 0;
        this.absence.firstName = "";
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