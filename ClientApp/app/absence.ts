import { User } from './user';

export class Absence {
    public startDate: Date;
    public endDate: Date;
    public user: User;
    public comments: string;
    public isActive: boolean;
    public id: number;

    constructor(startDate: Date, endDate: Date, user: User, comments: string, isActive: boolean) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.comments = comments;
        this.isActive = isActive;
    }
}