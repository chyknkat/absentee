import { Component } from '@angular/core';
import { NavItem } from "../../nav-item";

@Component({
    selector: 'navigation',
    templateUrl: '/nav.component.html',
    styleUrls: ['/nav.component.css']
})
export class NavComponent {
    navItems: NavItem[] = [new NavItem("Calendar", true), new NavItem("Add Absence", false)];

    onSelectNav(nav: NavItem) {
        this.navItems.forEach((navItem) => navItem.isActive = false);
        nav.isActive = true;
    }
}