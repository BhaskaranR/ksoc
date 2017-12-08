import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Marketplace, ISellerService } from '../models/marketplace.model';

@Injectable()
export class MarketplaceService implements ISellerService{
    constructor(
        private http: Http) {

    }

    getMarketplace(): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/mpapi/marketplace', options)
            .map(res => res.json());
    }

}