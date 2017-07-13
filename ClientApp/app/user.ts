import { Absence } from './absence';

export class User {
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public team: string;
    public absences: Absence[];
    public isActive: boolean;
    public id: number;

    constructor(firstName: string, lastName: string, team: string, absences: Absence[], isActive: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.team = team;
        this.absences = absences;
        this.isActive = isActive;
    }
}