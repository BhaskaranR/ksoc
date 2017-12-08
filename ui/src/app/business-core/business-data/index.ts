import * as fromBusiness from './business.reducer';
import * as fromCategory from './categories.reducer';
import * as fromSubCategories from './subcategories.reducer';
import * as fromAddBiz  from './addbusiness.reducer';

export interface BusinessState {
  businesses: fromBusiness.State;
  category: fromCategory.State;
  subcategory: fromSubCategories.State;
  addbiz: fromAddBiz.State;
}

export const businessReducer = {
  businesses: fromBusiness.businessReducer,
  category: fromCategory.categoryReducer,
  subcategory: fromSubCategories.subcategoryReducer,
  addbiz: fromAddBiz.addbizReducer
};
