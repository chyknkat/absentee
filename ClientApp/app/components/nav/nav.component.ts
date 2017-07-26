import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from "../../nav-item";

@Component({
    selector: 'navigation',
    templateUrl: '/nav.component.html',
    styleUrls: ['/nav.component.css']
})
export class NavComponent {
    navItems: NavItem[] = [new NavItem("calendar", "Calendar", true), new NavItem("absence", "Add Absence", false), new NavItem("editUser", "Edit User", false)];
    public isKonamiCode: boolean = false;
    constructor(private router: Router) {
        this.router.navigate(['calendar']);
    }

    onSelectNav(nav: NavItem) {
        this.navItems.forEach((navItem) => navItem.isActive = false);
        nav.isActive = true;
        if (nav.name === 'Calendar') {
            this.router.navigate(['calendar']);
        }
        if (nav.name === 'Add Absence') {
            this.router.navigate(['addabsence']);
        }
        if (nav.name === 'Edit User') {
            this.router.navigate(['edituser']);
        }
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        setTimeout(() => {
            this.isKonamiCode = true;
        }, 10000);
        
        console.log(event.key);
    }
}