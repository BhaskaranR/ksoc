import { Observable } from 'rxjs';

export interface Marketplace {
    productid: number;
    productName: string;
    productType: string;
    productMedia: string;
    shopTitle: string;
    profileurl: string;
    sellerIcon: string;
    sellerProductCount: string;
}

export interface ISellerService {
    /**
     * It will return all sellers and their products
     */
    getMarketplace(): Observable<Marketplace>;
}