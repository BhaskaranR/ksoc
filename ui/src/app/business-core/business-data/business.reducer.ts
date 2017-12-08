import * as businessActions from './business.action';
import * as profileActions from '../../core/profile-data/profile.action';
import { Business } from './business.model';
import { createSelector } from 'reselect';

export interface State {
    ids: string[];
    entities: { [id: string]: Business };
    selectedBizId: string | null;
    fetchedAllBiz: boolean;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedBizId: null,
    fetchedAllBiz: false
};

export function businessReducer (state = initialState, action: any): State  {
    switch (action.type) {
        case profileActions.ActionTypes.STORE_PROFILE_SUCCESS:
            const payload = action.payload.mybusinesses;
            if (payload === undefined || action.payload.mybusinesses.isBoom) {
                return state;
            } else {
                return updateBiz(state, payload);
            }
        case businessActions.ActionTypes.GET_ALL_BUSINESS:
        case businessActions.ActionTypes.GET_ALL_BUSINESS_NEARBY:
            return initialState;
        case businessActions.ActionTypes.GET_SELECT_BUSINESS_SUCCESS:
            return updateBiz(state, action.payload, action.payload[0]._id);
        case businessActions.ActionTypes.ADD_NEW_BUSINESS_SUCCESS:
        case businessActions.ActionTypes.GET_ALL_BUSINESS_SUCCESS:
        case businessActions.ActionTypes.GET_ALL_BUSINESS_NEARBY_SUCCESS:
        case businessActions.ActionTypes.GET_MYBUSINESS_SUCCESS:
        case businessActions.ActionTypes.GET_MYBUSINESS_FOLLOWING_SUCCESS:
            return updateBiz(state, action.payload);
        case businessActions.ActionTypes.FOLLOW_BUSINESS_SUCCESS:
        case businessActions.ActionTypes.UNFOLLOW_BUSINESS_SUCCESS:
            delete state.entities[action.payload._id];
            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, action.payload),
                selectedBizId: state.selectedBizId,
                fetchedAllBiz: true
            };
        default: {
            return state;
        }
    }
};

function updateBiz(state, business: Business[], selectedBiz?: string) {
    const newBusiness = business.filter(busi => !state.entities[busi._id]);
    const newBusinessIds = newBusiness.map(user => user._id);
    const newBusinessEntities = newBusiness.reduce((entities: { [id: string]: Business }, user: Business) => {
        return Object.assign(entities, {
            [user._id]: user
        });
    }, {});
    return {
        ids: [...state.ids, ...newBusinessIds],
        entities: Object.assign({}, state.entities, newBusinessEntities),
        selectedBizId: selectedBiz ? selectedBiz : state.selectedBizId,
        fetchedAllBiz: true
    };
}


export const getEntities = (state: State) => {
    return state.entities;
};

export const getAllBusinessSuccess = (state: State) => {
    return state.fetchedAllBiz;
};

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedBizId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
