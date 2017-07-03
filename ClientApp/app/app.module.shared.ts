import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
import { DatepickerModule } from 'ngx-bootstrap';
import { ScheduleModule } from 'primeng/primeng';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddAbsenceComponent } from './components/add-absence/add-absence.component';

(window as any).jQuery = (window as any).$ = jQuery;

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        CalendarComponent,
        AddAbsenceComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'calendar', pathMatch: 'full' },
            { path: 'calendar', component: CalendarComponent },
            { path: 'addabsence', component: AddAbsenceComponent },
            { path: '**', redirectTo: 'calendar' }
        ]),
        FormsModule,
        DatepickerModule.forRoot(),
        ScheduleModule
    ]
};
