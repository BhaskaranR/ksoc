
import * as businessActions from './business.action';
import { Category, BizCategory } from './business.model';


export interface State {
    catids: string[];
    biznames: string[];
    bizentities: BizCategory;
    entities: { [id: string]: Category };
}

const initialState: State = {
    catids: [],
    entities: {},
    bizentities: {},
    biznames: []
};

export function categoryReducer (state = initialState, action: any): State {
    switch (action.type) {
        case businessActions.ActionTypes.GET_ALL_CATEGORIES_SUCCESS:
            let bizcategories: BizCategory = action.payload;
            let biznames = Object.keys(bizcategories);
            let entities = {}
            biznames.forEach(biz => bizcategories[biz].forEach((category: Category) =>
                entities[category._id] = category
            ));

            return {
                catids: Object.keys(entities),
                entities: entities,
                bizentities: bizcategories,
                biznames: biznames
            };
        default: {
            return state;
        }
    }
};

export const getEntities = (state: State) => {
    return state.entities;
};

export const getBizEntities = (state: State) => {
    return state.bizentities;
};


export const getCatIds = (state: State) => state.catids;

export const getAllBizNames = (state: State) => state.biznames;
