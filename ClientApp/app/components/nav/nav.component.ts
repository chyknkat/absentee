import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from "../../nav-item";

@Component({
    selector: 'navigation',
    templateUrl: '/nav.component.html',
    styleUrls: ['/nav.component.css']
})
export class NavComponent {
    navItems: NavItem[] = [new NavItem("Calendar", true), new NavItem("Add Absence", false)];

    constructor(private router: Router) { }

    onSelectNav(nav: NavItem) {
        this.navItems.forEach((navItem) => navItem.isActive = false);
        nav.isActive = true;
        if (nav.name === 'Calendar') {
            this.router.navigate(['calendar']);
        }
        if (nav.name === 'Add Absence') {
            this.router.navigate(['addabsence']);
        }
    }
}