import { Observable } from 'rxjs';

export interface Seller {
    seller_id: number;
    payment_source: string;
    twitter_id: string;
    facebook_id: string;
    gplus_id: string;
    youtube_id: string;
    vimeo_id: string;
    instagram_id: string;
    pinterest_id: string;
    moleskine_id: string;
    tw_active: boolean;
    fb_active: boolean;
    gplus_active: boolean;
    youtube_active: boolean;
    vimeo_active: boolean;
    instagram_active: boolean;
    pinterest_active: boolean;
    moleskine_active: boolean;
    others_info: string;
    banner_pic: string;
    shop_url: string;
    shop_title: string;
    logo_pic: string;
    company_locality: string;
    country_pic: string;
    company_description: string;
    meta_keyword: string;
    meta_description: string;
    background_width: string;
    store_id: number;
    contact_number: number;
    return_policy: string;
    shipping_policy: string;
}

export interface ISellerService {
    /**
     * GET /V1/mpapi/admin/sellers/{id}
     * specific seller details.
     */
    getSeller(id: number): Observable<Seller>;
    /**
     * GET /V1/mpapi/admin/sellers
     * get seller list.
     */
    getSellers(): Observable<Seller>;
    updateSeller(seller: Seller): Observable<Seller>;
    /**
     * POST /V1/mpapi/sellers
     */
    createSeller(seller: Seller): Observable<Seller>;
    disableSeller(id: number): Observable<Seller>;
}