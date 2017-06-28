export class Absence {
    public fromDate: Date;
    public toDate: Date;
    public fromDateString: string;
    public toDateString: string;
    public name: string;
    public comments: string;


    constructor(fromDate: Date, toDate: Date, name: string, comments: string) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.fromDateString = fromDate.toLocaleDateString();
        this.toDateString = toDate.toLocaleDateString();
        this.name = name;
        this.comments = comments;
    }
}