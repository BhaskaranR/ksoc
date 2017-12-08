import { Observable } from 'rxjs';

export interface Cart {
    cart_id: string;
    item_id: number;
    sku: string;
    qty: number;
    name: string;
    price: number;
    product_type: string;
    quote_id: string;
}

export interface ICartService {
    
    getCartDetails(cart_id: string): Observable<Cart>;
    putCartDetails(): Observable<Cart>;

    getCartItems(cart_id: string): Observable<any>;
    postCartItems(): Observable<any>;
}

