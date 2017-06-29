export class Absence {
    
    constructor(public fromDate: Date, public toDate: Date, public name: string, public comments: string) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.name = name;
        this.comments = comments;
    }
}