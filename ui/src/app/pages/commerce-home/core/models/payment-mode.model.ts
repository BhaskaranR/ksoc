import { Observable } from 'rxjs';
import {Cart} from './cart.model';

export interface PaymentMode {
    po_number: string;
    method: string;
    code: string;
    title: string;
    cart: Cart;    
}

export interface IPaymentModeService {

    getCartPaymentMode(cart_id: number): Observable<PaymentMode>;

    getPaymentModes(): Observable<PaymentMode>;

}


