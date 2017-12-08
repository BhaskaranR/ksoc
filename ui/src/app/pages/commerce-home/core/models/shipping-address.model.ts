export interface ShippingAddress{
    id: number;
    customer_id: number;
      region_code: string;
      region: string;
      region_id: number;
    country_id: string;
    street: [
      string
    ];
    company: string;
    telephone: string;
    fax: string;
    postcode: string;
    city: string;
    firstname: string;
    lastname: string;
    middlename: string;
    prefix: string;
    suffix: string;
    vat_id: string;
    default_shipping: true;
    default_billing: true;
}