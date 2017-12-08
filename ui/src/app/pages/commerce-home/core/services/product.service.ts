import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
//import { HttpService } from '../core/http.service';

@Injectable()
export class ProductService {
    constructor(
        private http: Http) {

    }


    getProducts(): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/rest/default/V1/mpapi/admin/sellers/3/product', options)
            .map(res => res.json());
    }

    getSellers_Products(): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/mpapi/marketplace', options)
            .map(res => res.json());
    }

    getProductDetails(id: string): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/rest/default/V1/products/${id}', options)
            .map(res => res.json());
    }

}