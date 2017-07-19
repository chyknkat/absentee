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
    public isEdit:boolean = true;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    public updateUser() {
        this.clearErrors();
        if (this.user.id <= 0 || this.user.id === null || this.user.id === undefined) {
            this.setErrorMessage("Please choose an existing user.");
            return;
        }
        if (this.user.firstName.trim() === "") {
            this.setErrorMessage("First Name cannot be blank");
            return;
        }
        if (this.user.lastName.trim() === "") {
            this.setErrorMessage("Last Name cannot be blank");
            return;
        }
        if (this.user.team.trim() === "") {
            this.setErrorMessage("Team cannot be blank");
            return;
        }
        this.userService.updateUser(this.user)
            .subscribe(response => this.resetEditForm(),
            error => this.setErrorMessage("User could not be updated due to an error."));
    }

    public deleteUser() {
        this.clearErrors();
        if (this.user.id <= 0 || this.user.id === null || this.user.id === undefined) {
            this.setErrorMessage("Please choose an existing user.");
            return;
        }

        this.userService.toggleUserActiveFlag(this.user.id, false)
            .subscribe(response => this.resetEditForm(),
                error => this.setErrorMessage("User could not be deleted due to an error."));
    }

    public addUserView() {
        this.clearForm();
        this.clearErrors();
        this.isEdit = false;
    }

    public addNewUser() {
        this.clearErrors();
        if (this.user.firstName.trim() === "") {
            this.setErrorMessage("First Name cannot be blank");
            return;
        }
        if (this.user.lastName.trim() === "") {
            this.setErrorMessage("Last Name cannot be blank");
            return;
        }
        if (this.user.team.trim() === "") {
            this.setErrorMessage("Team cannot be blank");
            return;
        }

        this.userService.addNewUser(this.user)
            .subscribe(response => this.resetEditForm(),
                error => this.setErrorMessage("User could not be created due to an error."));

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

    private resetEditForm() {
        this.clearForm();
        this.setSuccess();
    }
    private clearForm() {
        this.loadUsers();
        this.user.firstName = "";
        this.user.lastName = "";
        this.user.fullName = "";
        this.user.id = 0;
        this.user.team = "";
        this.user.isActive = true;
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