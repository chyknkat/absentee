import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from "../../nav-item";

@Component({
    selector: 'navigation',
    templateUrl: '/nav.component.html',
    styleUrls: ['/nav.component.css']
})
export class NavComponent {
    navItems: NavItem[] = [new NavItem("calendar", "Calendar", true, true), new NavItem("addabsence", "Add Absence", false, true), new NavItem("edituser", "Edit User", false, true), new NavItem("reassurance", "Reassurance", false, false)];
    public isLoggedIn: boolean = false;
    public isKonamiCode: boolean = false;
    public isWrongCode: boolean = false;
    public loginCode: string = "";
    private passcode: string = "May the odds be ever in your favor";
    public b: string = "";
    public a: string = "";
    public m: string = "";
    public isReassurance: boolean = false;

    constructor(private router: Router) {
        this.router.navigate(['calendar-logged-off']);
    }

    onSelectNav(nav: NavItem) {
        if (nav.name !== 'Reassurance') {
            this.navItems.forEach((navItem) => navItem.isActive = false);
            nav.isActive = true;
            this.router.navigate([`${nav.id}`]);
        } else {
            nav.isHidden = true;
            this.isReassurance = true;
            setTimeout(() => {
                this.isReassurance = false;
                nav.isHidden = false;
            }, 10000);
        }
    }

    public login() {
        this.isWrongCode = false;
        if (this.loginCode === this.passcode) {
            this.isLoggedIn = true;
            this.navItems.forEach(n => n.isHidden = false);
            this.router.navigate(['calendar']);
        } else {
            this.isWrongCode = true;
        }
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === "B" && this.b === "") {
            this.b = event.key;
        } else if (event.key === "A" && this.a === "" && this.b === "B") {
            this.a = event.key;
        }else if (event.key === "M" && this.m === "" && this.b === "B" && this.a === "A") {
            this.m = event.key;
        } else {
            this.clearKonami();
        }
        if (this.b === "B" && this.a === "A" && this.m === "M") {
            this.isKonamiCode = true;
            setTimeout(() => {
                this.isKonamiCode = false;
                this.clearKonami();
            }, 4000);
        }
    }

    private clearKonami() {
        this.b = "";
        this.a = "";
        this.m = "";
    }
}