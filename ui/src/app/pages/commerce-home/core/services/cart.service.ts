import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Cart, ICartService } from '../models/cart.model';


@Injectable()
export class CartService {
    constructor(
        private http: Http) {

    }
    
    getCartDetails(cart_id): Observable<Cart> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/carts/{cartId}', options)
            .map(res => res.json());
    }

    putCartDetails(): Observable<Cart> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/carts/${quoteId}/items', options)
            .map(res => res.json());
    }

    getCartItems(cart_id: string): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/carts/${cart_id}/items', options)
            .map(res => res.json());
    }
    postCartItems(Cart): Observable<any> {
        let api_headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'authorization': `Bearer 5a3fpuh93vtnu50ctcimil7xe1qc8dbd` });
        let options = new RequestOptions({ headers: api_headers });
        return this.http.get('http://ec2-34-227-65-121.compute-1.amazonaws.com/index.php/rest/default/V1/carts/mine', options)
            .map(res => res.json());
    }
}