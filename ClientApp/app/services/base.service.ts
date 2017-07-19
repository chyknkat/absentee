import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


export class ServiceBase {
    public baseUrl: string = 'http://localhost:57055/';

    protected  headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    protected options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(protected http: Http) { }

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    protected getResponse(res: Response) {
        return res.ok;
    }

    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}