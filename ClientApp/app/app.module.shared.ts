import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { AddAbsenceComponent } from './components/add-absence/add-absence.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        AddAbsenceComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'nav', pathMatch: 'full' },
            { path: 'nav', component: NavComponent },
            { path: '**', redirectTo: 'nav' }
        ]),
        FormsModule,
        DatepickerModule.forRoot()
    ]
};
