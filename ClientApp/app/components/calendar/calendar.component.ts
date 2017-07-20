import { Component, OnInit, ViewChild, AfterViewChecked  } from '@angular/core';
import { Absence } from "../../absence";
import { User } from "../../user";
import { AbsenceService } from '../../services/absence.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleModule } from 'primeng/primeng';
import { ModalDirective } from 'ngx-bootstrap/modal';

import 'fullcalendar';

import * as moment from 'moment';

declare var moment: any;

@Component({
    selector: 'calendar',
    templateUrl: '/calendar.component.html',
    styleUrls: ['/calendar.component.css'],
    providers: [AbsenceService]
})

export class CalendarComponent implements OnInit, AfterViewChecked {
    public absences: Absence[];
    public userAbsences: Absence[] = [];
    public events: any[] = [];
    public error: any;
    public errorMessage: string = "";
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public headerConfig: any;
    public dialogVisible: boolean = false;
    private tomorrow: Date = moment(new Date()).add('days', 1);
    public absence: Absence = new Absence(this.tomorrow, this.tomorrow, new User("", "", "", false), "", false);
    @ViewChild("absenceEditorModal") public absenceEditorModal: ModalDirective;
    

    constructor(private absenceService: AbsenceService) { }

    ngOnInit(): void {
        this.headerConfig = {
            left: 'today',
            center: 'title',
            right: 'prev,next'
        };

        this.loadAbsences();

    }

    ngAfterViewChecked(): void {
        $('.fc-scroller').css('overflow', 'visible');
        $('.ui-widget-header').css('margin-right', 0);
    }
    private populateEvents(absenses: Absence[]): void {
        this.events = [];
        this.absences = absenses;
        if (this.absences) {
            this.absences.forEach((absence) => {
                if (absence.isActive) {
                    this.events.push({
                        "title": `${absence.user.firstName} ${absence.comments === null ? "" : absence.comments} `,
                        "start": absence.startDate,
                        "end": absence.endDate,
                        "allDay": true,
                        "id": absence.id
                    });
                }
            });
        }
    }

    public openAbsenceEditor(e) {
        this.absenceService.getAbsenceById(e.calEvent.id)
            .subscribe(absence => {
                this.absence = absence;
                this.absence.startDate = new Date(absence.startDate);
                this.absence.endDate = new Date(absence.endDate);
                this.absenceEditorModal.show();
                },
            error => this.error = error);
    }

    public onUpdateAbsence() {
        this.clearErrors();
        this.isSuccessful = false;
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

    public deleteAbsence() {
        this.clearErrors();
        this.absenceService.toggleAbsenceActiveFlag(this.absence.id, false)
            .subscribe(response => {
                    for (var i = 0; i < this.events.length; i++)
                        if (this.events[i].id === this.absence.id) {
                            this.events.splice(i, 1);
                            break;
                        }
                    this.absenceEditorModal.hide();
                },
            error => this.setErrorMessage("Your absence could not be deleted due to an error."));
    }

    private loadAbsences() {
        this.absences = [];
        this.absenceService.getAllAbsences()
            .subscribe(absences => this.populateEvents(absences),
                error => this.error = error);
    }

    private getUserAbsences() {
        this.absenceService.getAbsencesByUser(this.absence.user.id)
            .subscribe(userAbsences => {
                this.populateUserAbsences(userAbsences);
                this.checkAbsenceExistence();
            }, error => this.setErrorMessage("Error getting user's absences"));
    }

    private populateUserAbsences(absences: Absence[]): void {
        this.userAbsences = [];
        absences.forEach(absence => {
            if (absence.isActive) {
                this.userAbsences.push(absence);
            }
        });
    }

    private checkAbsenceExistence() {
        var errors = 0;
        this.userAbsences.forEach(absence => {
            if (this.absence.id !== absence.id) {
                if (this.absence.startDate >= moment(absence.startDate) &&
                    this.absence.startDate < moment(absence.endDate)) {
                    errors++;
                }
                if (this.absence.endDate >= moment(absence.startDate) &&
                    this.absence.endDate <= moment(absence.endDate)) {
                    errors++;
                }
                if (moment(absence.startDate) >= this.absence.startDate &&
                    moment(absence.startDate) < this.absence.endDate) {
                    errors++;
                }
                if (moment(absence.endDate) > this.absence.startDate &&
                    moment(absence.endDate) <= this.absence.endDate) {
                    errors++;
                }
            }
        });
        if (errors > 0) {
            this.setErrorMessage("Absence on date(s) already exists.");
        } else {
            this.updateAbsence();
        }
    }

    private updateAbsence() {
        this.absenceService.updateAbsence(this.absence)
            .subscribe(response => {
                this.isSuccessful = true;
                this.loadAbsences();
            }, error => this.setErrorMessage("Your absence could not be updated due to an error."));
    }

    private setErrorMessage(message: string): void {
        this.errorMessage = message;
        this.hasError = true;
    }

    private clearErrors(): void {
        this.errorMessage = "";
        this.hasError = false;
    }

}