import { Component, Input, OnInit } from '@angular/core';
import { Absence } from '../../absence';
import { User } from '../../user';
import { AbsenceService } from '../../services/absence.service';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';

declare var moment: any;

@Component({
    selector: 'add-absence',
    templateUrl: '/add-absence.component.html',
    styleUrls: ['/add-absence.component.css'],
    providers: [AbsenceService, UserService]
})
export class AddAbsenceComponent implements OnInit {
    public blankUser: User = new User("", "", "", true);
    @Input() users: User[] = [this.blankUser];
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public errorMessage: string = "";
    private tomorrow: Date = moment(new Date()).add('days', 1);
    @Input() absence: Absence = new Absence(this.tomorrow, this.tomorrow, new User("", "", "", false), "", false);

    constructor(private absenceService: AbsenceService, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getAllUsers()
            .subscribe(users => this.populateUsers(users),
            error => this.setErrorMessage("Error getting users"));
    }

    public onAbsenceSubmit() {
        this.clearErrors();
        this.isSuccessful = false;

        if (this.absence.user.firstName.trim() === "") {
            this.setErrorMessage("Name cannot be blank.");
            return;
        }

        if (this.absence.startDate < moment()) {
            this.setErrorMessage("Start Date must be in the future");
            return;
        }

        if (this.absence.endDate <= this.absence.startDate) {
            this.setErrorMessage("Back in Office Date must be later than Start Date.");
            return;
        }

        this.absenceService.addNewAbsence(this.absence)
            .subscribe(response => this.clearForm(), error => this.setErrorMessage("Could not add absence due to server error."));
    }

    private clearForm(): void {
        this.absence.startDate = void 0;
        this.absence.endDate = void 0;
        this.absence.user.firstName = "";
        this.absence.user.lastName = "";
        this.absence.user.fullName = "";
        this.absence.user.isActive = false;
        this.absence.user.team = "";
        this.absence.comments = "";
        this.absence.isActive = false;

        this.setSuccess();
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

    private populateUsers(users: User[]): void {
        users.forEach((user) => {
            if (user.isActive) {
                this.users.push(user);
            }
        });
    }
}