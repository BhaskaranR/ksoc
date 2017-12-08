import { Observable } from 'rxjs';

import { Products } from './products.model';

export interface Orders {

    invoice_id: number;
    base_currency_code: string;
    base_discount_amount: number;
    base_grand_total: number;
    base_discount_tax_compensation_amount: number;
    base_shipping_amount: number;
    base_shipping_discount_tax_compensation_amnt: number;
    base_shipping_incl_tax: number;
    base_shipping_tax_amount: number;
    base_subtotal: number;
    base_subtotal_incl_tax: number;
    base_tax_amount: number;
    base_total_refunded: number;
    base_to_global_rate: number;
    base_to_order_rate: number;
    billing_address_id: number;
    can_void_flag: number;
    created_at: string;
    discount_amount: number;
    discount_description: string;
    email_sent: number;
    entity_id: number;
    global_currency_code: string;
    grand_total: number;
    discount_tax_compensation_amount: number;
    increment_id: string;
    is_used_for_refund: number;
    order_currency_code: string;
    order_id: number;
    shipping_address_id: number;
    shipping_amount: number;
    shipping_discount_tax_compensation_amount: number;
    shipping_incl_tax: number;
    shipping_tax_amount: number;
    state: number;
    store_currency_code: string;
    store_id: number;
    store_to_base_rate: number;
    store_to_order_rate: number;
    subtotal: number;
    subtotal_incl_tax: number;
    tax_amount: number;
    total_qty: number;
    transaction_id: string;
    updated_at: string;
    items: Products;
}

export interface IOrdersService {

    getInvoice(invoice_id: number): Observable<Orders>;

    getInvoices(): Observable<Orders>;
    
}

