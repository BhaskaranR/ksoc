import { Injectable, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class AccountActivationService {
    private ACCOUNT_ACTIVATION_URL : string = '/users/confirmemail';
    constructor(private http : Http, 
        @Inject('apiBase') private apiBase: string){

    }

     public activate(id : string) : Observable<Response> {
       return this.http.get(this.apiBase + this.ACCOUNT_ACTIVATION_URL + '/' + id).map((res) => res.json());
     }

}