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
    public errorMessage: string = "";
    private tomorrow: Date = moment(new Date()).add('days', 1);
    @Input() absence: Absence = new Absence(this.tomorrow, this.tomorrow, "", "");

    public onAbsenceSubmit() {
        this.clearErrors();

        if (this.absence.name.trim() === "") {
            this.errorMessage = "Name cannot be blank.";
            this.hasError = true;
            return;
        }

        if (this.absence.fromDate < moment().add('days', 1)) {
            this.errorMessage = "From date must be in the future";
            this.hasError = true;
            return;
        }

        if (this.absence.toDate < this.absence.fromDate) {
            this.errorMessage = "To date must be later than from date.";
            this.hasError = true;
            return;
        }

        this.clearForm();
    }

    private clearForm() {
        this.absence.fromDate = void 0;
        this.absence.toDate = void 0;
        this.absence.name = "";
        this.absence.comments = "";
    }

    private clearErrors() {
        this.errorMessage = "";
        this.hasError = false;
    }
}