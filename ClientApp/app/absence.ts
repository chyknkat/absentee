export class Absence {
    
    constructor(public startDate: Date, public endDate: Date, public firstName: string, public comments: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.firstName = firstName;
        this.comments = comments;
    }
}