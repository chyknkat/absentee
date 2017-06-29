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
    }

    
}