import { Observable } from 'rxjs';
import {Orders} from './orders.model';

export interface PaymentInfo {
    code: string;
    title: string;
    totals: Orders;
    
}

export interface IPaymentInfoService {

    getPaymentInformation(): Observable<PaymentInfo>;

    postPaymentInformation(): Observable<PaymentInfo>;
}