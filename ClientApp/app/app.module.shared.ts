import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as jQuery from 'jquery';
import { DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { ScheduleModule } from 'primeng/primeng';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarLoggedOffComponent } from './components/calendar-logged-off/calendar-logged-off.component';
import { AddAbsenceComponent } from './components/add-absence/add-absence.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { AbsenceService } from './services/absence.service';
import { UserService } from './services/user.service';

(window as any).jQuery = (window as any).$ = jQuery;

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        CalendarComponent,
        CalendarLoggedOffComponent,
        AddAbsenceComponent,
        EditUserComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'calendar-logged-off', pathMatch: 'full' },
            { path: 'calendar', component: CalendarComponent },
            { path: 'calendar-logged-off', component: CalendarLoggedOffComponent },
            { path: 'addabsence', component: AddAbsenceComponent },
            { path: 'edituser', component: EditUserComponent },
            { path: '**', redirectTo: 'calendar-logged-off' }
        ]),
        FormsModule,
        HttpModule,
        DatepickerModule.forRoot(),
        ModalModule.forRoot(),
        ScheduleModule
    ],
    providers: [ AbsenceService, UserService ]
};
