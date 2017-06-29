import { Component, OnInit } from '@angular/core';
import { Absence } from "../../absence";
import { ScheduleModule } from 'primeng/primeng';
import 'fullcalendar';

@Component({
    selector: 'calendar',
    templateUrl: '/calendar.component.html',
    styleUrls: ['/calendar.component.css']
})

export class CalendarComponent implements OnInit {
    public events: any[];
    headerConfig: any;
    ngOnInit(): void {
        this.headerConfig = {
            left: 'today',
            center: 'title',
            right: 'prev,next'
        };
        this.events = [
            {
                "title": "All Day Event",
                "start": "2017-07-01"
            },
            {
                "title": "Long Event",
                "start": "2017-07-07",
                "end": "2017-07-10"
            },
            {
                "title": "Repeating Event",
                "start": "2017-07-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2017-07-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2017-07-11",
                "end": "2017-07-13"
            }
        ];
    }

    
}