import { Component, Input } from '@angular/core';
import { Absence } from "../../absence";

@Component({
    selector: 'add-absence',
    templateUrl: '/add-absence.component.html',
    styleUrls: ['/add-absence.component.css']
})
export class AddAbsenceComponent {
    public hasError: boolean = false;
    public errorMessage: string = "";
    @Input() absence: Absence = new Absence(new Date(), new Date(), "", "");

   public onAbsenceSubmit() {
        this.clearErrors();

        if (this.absence.name.trim() === "") {
            this.errorMessage = "Name cannot be blank.";
            this.hasError = true;
            return;
        }

        this.clearForm();
    }

    private clearForm() {
        this.absence.fromDate = new Date();
        this.absence.toDate = new Date();
        this.absence.name = "";
        this.absence.comments = "";
    }

    private clearErrors() {
        this.errorMessage = "";
        this.hasError = false;
    }
}