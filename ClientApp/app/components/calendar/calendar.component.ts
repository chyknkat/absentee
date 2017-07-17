import { Component, OnInit, ViewChild  } from '@angular/core';
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

export class CalendarComponent implements OnInit {
    public absences: Absence[];
    public events: any[];
    public error: any;
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

        this.absenceService.getAllAbsences()
            .subscribe(absences => this.populateEvents(absences),
            error => this.error = error);

    }

    private populateEvents(absenses: Absence[]): void {
        this.events = [
            {
                "title": "Katrina",
                "start": "2017-07-03",
                "end": "2017-07-04",
                "allDay": true
            },
            {
                "title": "Kristy",
                "start": "2017-07-07",
                "end": "2017-07-11"
            },
            {
                "title": "Adam",
                "start": "2017-07-10",
                "end": "2017-07-11"
            },
            {
                "title": "Chris",
                "start": "2017-07-11",
                "end": "2017-07-15"
            },
            {
                "title": "Sree",
                "start": "2017-07-11",
                "end": "2017-07-13"
            }
        ];
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

    openAbsenceEditor(e) {
        this.absenceService.getAbsenceById(e.calEvent.id)
            .subscribe(absence => {
                this.absence = absence;
                this.absenceEditorModal.show();
                },
            error => this.error = error);
    }

    deleteAbsence() {
        this.absenceService.toggleAbsenceActiveFlag(this.absence.id, false)
            .subscribe(response => {
                    for (var i = 0; i < this.events.length; i++)
                        if (this.events[i].id === this.absence.id) {
                            this.events.splice(i, 1);
                            break;
                        }
                    this.absenceEditorModal.hide();
                },
                error => this.error = error);
    }

}