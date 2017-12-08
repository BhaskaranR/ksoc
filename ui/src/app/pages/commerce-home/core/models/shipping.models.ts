export interface Shipping{

    carrier_code: string;
    method_code: string;
    carrier_title: string;
    method_title: string;
    amount: number;
    base_amount: number;
    available: true;
    extension_attributes: {};
    error_message: string;
    price_excl_tax: number;
    price_incl_tax: number
}

