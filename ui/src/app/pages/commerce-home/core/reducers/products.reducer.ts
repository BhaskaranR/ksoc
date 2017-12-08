import * as ProductsActions from '../actions/products.actions';
import { Products } from '../models/products.model';

export type Action = ProductsActions.All;

export interface ProductsState {
    products: Products[];
    isLoadingProducts: boolean;
    selectedProduct: any;
    error: any;
    length:number;
    //courseLessons: Lesson[];
}

export const courseInitialState: ProductsState = {
    products: null,
    isLoadingProducts: true,
    selectedProduct: null,
    error: null,
    length:0
    //courseLessons: null
}
/// Reducer function
export function productsReducer(state: Products, action: Action) {
  switch (action.type) {
    case ProductsActions.GET_POST:
      return { ...state, loading: true };
    case ProductsActions.GET_POST_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case ProductsActions.VOTE_UPDATE:
      return { ...state, ...action.payload, loading: true };
    case ProductsActions.VOTE_SUCCESS:
      return { ...state, loading: false };
    case ProductsActions.VOTE_FAIL:
      return { ...state, ...action.payload, loading: false };
    
      case ProductsActions.PRODUCTS_LOAD_REQUESTED: {
            return Object.assign({}, state, {
                products: null,
                isLoadingProducts: true,
                selectedProduct: null,
                error: null,
                length:0
            });
        }

        case ProductsActions.PRODUCTS_LOAD_COMPLETED: {
            return Object.assign({}, state, {
                products: action.payload.products,
                isLoadingProducts: false,
                selectedProduct: null,
                error: null,
                length:action.payload.products.length
            });
        }
    default:
      return state;
  }
}