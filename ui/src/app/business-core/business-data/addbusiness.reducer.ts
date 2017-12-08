import * as businessActions from './business.action';

export interface State {
    selectedBusiness: string;
    selectedCategory: string;
    selectedSubCategory: string;
}

const initialState: State = {
    selectedBusiness: null,
    selectedCategory: null,
    selectedSubCategory: null
};

export function addbizReducer(state = initialState, action: any): State  {
    switch (action.type) {
        case businessActions.ActionTypes.ADDNEW_SETBIZ:
           return {
               selectedBusiness: action.payload,
               selectedCategory: null,
               selectedSubCategory: null
           };
            case businessActions.ActionTypes.ADDNEW_SETBIZCATEGORY:
           return {
               selectedBusiness: state.selectedBusiness,
               selectedCategory: action.payload,
               selectedSubCategory: null
           };
            case businessActions.ActionTypes.ADDNEW_SETBIZSUBCATEGORY:
           return {
               selectedBusiness: state.selectedBusiness,
               selectedCategory: state.selectedCategory,
               selectedSubCategory: action.payload
           };
        default: {
            return state;
        }
    }
};


export const getSelectedBusiness = (state: State) =>  state.selectedBusiness;
export const getSelectedCategory = (state: State) => {
    return state.selectedCategory;
};
export const getSelectedSubCategory = (state: State) => state.selectedSubCategory;
