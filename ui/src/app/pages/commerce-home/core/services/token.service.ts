import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
//import { HttpService } from '../core/http.service';

@Injectable()
export class TokenService {
    constructor(
        private http: Http) {

    }


    getAdminToken(): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: api_headers });
        let body = JSON.stringify({ 'username': 'admin', 'password': 'chandra@1' });
        return this.http.post('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/V1/integration/admin/token', body, options)
            .map(res => res.json());

    }

}