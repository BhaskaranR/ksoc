import * as businessActions from './business.action';
import { SubCategory } from './business.model';

import { createSelector } from 'reselect';

export interface State {
    ids: string[];
    category_id: string[];
    catentities: {[category_id: string]: SubCategory[]};
    entities:  { [id: string]: SubCategory[] };
}

const initialState: State = {
    ids: [],
    entities: {},
    catentities: {},
    category_id: [],
};

export function subcategoryReducer (state = initialState, action: any): State {
    switch (action.type) {
        case businessActions.ActionTypes.GET_SUB_CATEGORIES_SUCCESS:
            const categories: SubCategory[] = action.payload;
            if (categories.length <= 0 ) {
                return state;
            }
            const newSubCategories = categories.filter(cat => !state.entities[cat._id]);
            const newSubCategoryIds = newSubCategories.map(cat => cat._id);
            const category_id = newSubCategories.map(cat => cat.category_id)[0];
            const newSubCategoryEntities = newSubCategories.reduce((entities: { [id: string]: SubCategory }, cat: SubCategory) => {
                return Object.assign(entities, {
                    [cat._id]: cat
                });
            }, {});

            return {
                ids: [...state.ids, ...newSubCategoryIds],
                entities: Object.assign({}, state.entities, newSubCategoryEntities),
                catentities: Object.assign({}, state.catentities, {[category_id] : categories}),
                category_id: [...state.category_id, category_id ]
            };
        default: {
            return state;
        }
    }
};

export const getCatEntities = (state: State) => {
    return state.catentities;
};

export const getIds = (state: State) => state.ids;

export const getAllCategories = (state: State) => state.category_id;


