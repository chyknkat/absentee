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

    public updateAbsence() {
        this.clearErrors();
        if (this.absence.startDate < moment()) {
            this.setErrorMessage("Start Date must be in the future");
            return;
        }

        if (this.absence.endDate <= this.absence.startDate) {
            this.setErrorMessage("Back in Office Date must be later than Start Date.");
            return;
        }
        this.absenceService.updateAbsence(this.absence)
            .subscribe(response => {
                this.isSuccessful = true;
                this.loadAbsences();
            }, error => this.setErrorMessage("Your absence could not be updated due to an error."));
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
        this.absenceService.getAllAbsences()
            .subscribe(absences => this.populateEvents(absences),
                error => this.error = error);
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