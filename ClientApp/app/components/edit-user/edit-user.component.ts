import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from "../../user";

@Component({
    selector: 'edit-user',
    templateUrl: '/edit-user.component.html',
    styleUrls: ['/edit-user.component.css'],
    providers: [UserService]
})
export class EditUserComponent implements OnInit {
    @Input() users: User[] = [];
    public errorMessage: string = "";
    public hasError: boolean = false;
    public isSuccessful: boolean = false;
    public user: User = new User("", "", "", true);
    public teams: string[] = ["Internal", "External"];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    public updateUser() {
        this.clearErrors();

        this.userService.updateUser(this.user)
            .subscribe(response => this.clearForm(),
            error => this.setErrorMessage("User could not be updated due to an error."));
    }

    public deleteUser() {
        this.clearErrors();
    }

    private loadUsers() {
        this.userService.getAllUsers()
            .subscribe(users => this.populateUsers(users),
            error => this.setErrorMessage("Error getting users"));
    }

    private setErrorMessage(message: string): void {
        this.errorMessage = message;
        this.hasError = true;
    }

    private clearErrors(): void {
        this.errorMessage = "";
        this.hasError = false;
    }

    private clearForm() {
        this.loadUsers();
        this.user.firstName = "";
        this.user.lastName = "";
        this.user.fullName = "";
        this.user.id = 0;
        this.user.team = "";
        this.user.isActive = true;
        this.setSuccess();
    }

    private setSuccess(): void {
        this.isSuccessful = true;
        setTimeout(() => {
            this.isSuccessful = false;
        }, 10000);
    }

    private populateUsers(users: User[]): void {
        this.users = [];
        users.forEach((user) => {
            if (user.isActive) {
                this.users.push(user);
            }
        });
    }
}