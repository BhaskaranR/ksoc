import { Action } from '@ngrx/store';
import { Products } from '../models/products.model';

export const GET_POST = 'Post get';
export const GET_POST_SUCCESS = 'Post get success';
export const VOTE_UPDATE = 'Post Vote';
export const VOTE_SUCCESS = 'Post Vote success';
export const VOTE_FAIL = 'Post Vote fail';
export const PRODUCTS_LOAD_REQUESTED = '[Products] Load All Products Requested';
export const PRODUCTS_LOAD_COMPLETED = '[Products] Load All Products Completed';

export class ProductsPayload {
    constructor(public products: Products[]) { }
}

export class LoadAllProductsRequestedAction implements Action {
    readonly type = PRODUCTS_LOAD_REQUESTED;

    constructor(public payload = null) { }
} 

export class LoadAllProductsCompletedAction implements Action {
    readonly type = PRODUCTS_LOAD_COMPLETED;

    constructor(public payload: ProductsPayload) { }
} 


export class GetPost implements Action {
    readonly type = GET_POST;
    constructor(public payload: any) { }
}
export class GetPostSuccess implements Action {
    readonly type = GET_POST_SUCCESS;
    constructor(public payload: Products) { }
}
export class VoteUpdate implements Action {
    readonly type = VOTE_UPDATE;
    constructor(public payload: any) { }
}
export class VoteSuccess implements Action {
    readonly type = VOTE_SUCCESS;
    constructor(public payload?: any) { }
}
export class VoteFail implements Action {
    readonly type = VOTE_FAIL;
    constructor(public payload?: any) { }
}
export type All
    = GetPost
    | GetPostSuccess
    | VoteUpdate
    | VoteSuccess
    | VoteFail
    | LoadAllProductsRequestedAction
    | LoadAllProductsCompletedAction;