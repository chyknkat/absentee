import { Component, OnInit } from '@angular/core';
import { Absence } from "../../absence";
import { AbsenceService } from '../../services/absence.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleModule } from 'primeng/primeng';
import 'fullcalendar';

@Component({
    selector: 'calendar',
    templateUrl: '/calendar.component.html',
    styleUrls: ['/calendar.component.css'],
    providers: [ AbsenceService ]
})

export class CalendarComponent implements OnInit {
    public absences: Absence[];
    public events: any[];
    public error: any;
    public headerConfig: any;

    constructor(private absenceService: AbsenceService) { }

    ngOnInit(): void {
        this.headerConfig = {
            left: 'today',
            center: 'title',
            right: 'prev,next'
        };

        this.absenceService.getAllAbsences()
            .subscribe(absences => this.absences = absences,
            error => this.error = error);

        this.events = [
            {
                "title": "Katrina",
                "start": "2017-07-03",
                "end": "2017-07-04"
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
        if (this.absences) {
            this.absences.forEach((absence) => {
                this.events.push({
                    "title": `${absence.user.firstName} ${absence.comments}`,
                    "start": absence.startDate,
                    "end": absence.endDate
                });
            });
        }
       

    }

    


}