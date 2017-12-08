import { Observable } from 'rxjs';

export interface Category {
    id: number;
    //parent_id: number;
    name: string;
    is_active: boolean;
    position: number;
    level: number;
    product_count: number;
}

export interface ICategoryService {
    /**
     * GET /V1/categories/{categoryId}
     * Get info about category by category id
     */
    getCategory(id: number): Observable<Category>;
    /**
     * GET /V1/categories
     * Retrieve list of categories
     */
    getAllCategories(): Observable<Category>;

    getCategoryProducts(id: number): Observable<any>;
}