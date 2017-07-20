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
    public userAbsences :Absence[] = [];
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public errorMessage: string = "";
    private tomorrow: Date = moment(new Date()).add('days', 1);
    @Input() absence: Absence = new Absence(this.tomorrow, this.tomorrow, new User("", "", "", false), "", false);
    
    constructor(private absenceService: AbsenceService, private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
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

        this.getUserAbsences();
    }

    private resetAbsenceForm(): void {
        this.loadUsers();
        this.clearAbsenceFields();
        this.setSuccess();
    }

    private clearAbsenceFields(): void {
        this.absence.startDate = new Date(this.tomorrow);
        this.absence.endDate = new Date(this.tomorrow);
        this.absence.user = this.users[0];
        this.absence.comments = "";
        this.absence.isActive = false;
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

    private loadUsers() {
        this.userService.getAllUsers()
            .subscribe(users => this.populateUsers(users),
                error => this.setErrorMessage("Error getting users"));
    }

    private getUserAbsences() {
        this.absenceService.getAbsencesByUser(this.absence.user.id)
            .subscribe(userAbsences => {
                this.populateUserAbsences(userAbsences);
                return this.checkAbsenceExistence();
            }, error => {
                this.setErrorMessage("Error getting user's absences");
                return false;
            });
    }

    private checkAbsenceExistence() {
        var errors = 0;
        this.userAbsences.forEach(absence => {
            if (this.absence.startDate >= moment(absence.startDate) && this.absence.startDate < moment(absence.endDate)) {
                errors++;
            }
            if (this.absence.endDate >= moment(absence.startDate) && this.absence.endDate <= moment(absence.endDate)) {
                errors++;
            }
            if (moment(absence.startDate) >= this.absence.startDate && moment(absence.startDate) < this.absence.endDate) {
                errors++;
            }
            if (moment(absence.endDate) > this.absence.startDate && moment(absence.endDate) <= this.absence.endDate) {
                errors++;
            }
        });
        if (errors > 0) {
            this.setErrorMessage("Absence on date(s) already exists.");
        } else {
            this.setNewAbsence();
        }
    }

    private setNewAbsence() {
        this.absenceService.addNewAbsence(this.absence)
            .subscribe(response => this.resetAbsenceForm(), error => this.setErrorMessage("Could not add absence due to server error."));
    }

    private populateUsers(users: User[]): void {
        users.forEach((user) => {
            if (user.isActive) {
                this.users.push(user);
            }
        });
    }

    private populateUserAbsences(absences: Absence[]): void {
        this.userAbsences = [];
        absences.forEach(absence => {
            if (absence.isActive) {
                this.userAbsences.push(absence);
            }
        });
    }
}

