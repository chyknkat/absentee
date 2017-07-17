import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from "../../user";

@Component({
    selector: 'edit-user',
    templateUrl: '/edit-user.component.html',
    styleUrls: ['/edit-user.component.css'],
    providers: [ UserService]
})
export class EditUserComponent implements OnInit {
    @Input() users: User[] = [];
    public errorMessage: string = "";
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public user: User = new User("", "", "", true);
    public teams:string[] = ["Internal", "External"];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getAllUsers()
            .subscribe(users => this.populateUsers(users),
                error => this.setErrorMessage("Error getting users"));
    }

    public updateUser() {
        
    }

    public deleteUser() {
        
    }

    private setErrorMessage(message: string): void {
        this.errorMessage = message;
        this.hasError = true;
    }

    private clearErrors(): void {
        this.errorMessage = "";
        this.hasError = false;
    }

    private setSuccess(): void {
        this.isSuccessful = true;
        setTimeout(() => {
            this.isSuccessful = false;
        }, 10000);
    }

    private populateUsers(users: User[]): void {
        users.forEach((user) => {
            if (user.isActive) {
                this.users.push(user);
            }
        });
    }
}