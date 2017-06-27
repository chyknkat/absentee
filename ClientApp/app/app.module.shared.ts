import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'nav', pathMatch: 'full' },
            { path: 'nav', component: NavComponent },
            { path: '**', redirectTo: 'nav' }
        ])
    ]
};
