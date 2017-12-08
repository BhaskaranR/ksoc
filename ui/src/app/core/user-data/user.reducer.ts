import * as profileActions from '../profile-data/profile.action';

import * as userActions from './user.action';
import * as businessActions from '../../business-core/business-data/business.action';

import { User } from './user-model';
import { createSelector } from 'reselect';
import { BusinessWithUsers } from '../../business-core/business-data/business.model';

export interface State {
    ids: string[];
    entities: { [id: string]: User };
    selectedUserId: string | null;
    fetchedAllUsers: boolean;
    peopleRouteAction: number | null;
};

const initialState: State = {
    ids: [],
    entities: {},
    selectedUserId: null,
    fetchedAllUsers: false,
    peopleRouteAction: null
};

export function userReducer (state = initialState, action: any): State  {
    switch (action.type) {
        case profileActions.ActionTypes.GET_MY_FOLLOWERS:
            return Object.assign({}, state, { peopleRouteAction: 1 });
        case profileActions.ActionTypes.GET_MY_FOLLOWING:
            return Object.assign({}, state, { peopleRouteAction: 2 });
        case profileActions.ActionTypes.GET_MY_FOLLOWING_SUCCESS:
            return Object.assign({}, updateUsers(state, action.payload),
                { fetchedAllUsers: state.fetchedAllUsers });
        case userActions.ActionTypes.GET_MY_FOLLOWING_SUCCESS:
            return Object.assign({}, updateUsers(state, action.payload),
                { fetchedAllUsers: state.fetchedAllUsers });
        case userActions.ActionTypes.GET_ALL_USERS_SUCCESS:
            return Object.assign({}, updateUsers(state, action.payload),
                { fetchedAllUsers: true });
        case userActions.ActionTypes.GET_AND_SELECT_USER_SUCCESS:
            const user: User = action.payload;
            const existing = state.entities[user._id];
            delete state.entities[user._id];
            if (existing) {
                return {
                    ids: state.ids,
                    entities: Object.assign({}, state.entities, state.entities[user._id] = action.payload),
                    selectedUserId: user._id,
                    fetchedAllUsers: state.fetchedAllUsers,
                    peopleRouteAction: state.peopleRouteAction
                };
            }
            return {
                ids: [...state.ids, user._id],
                entities: Object.assign({}, state.entities, state.entities[user._id] = action.payload),
                selectedUserId: user._id,
                fetchedAllUsers: state.fetchedAllUsers,
                peopleRouteAction: state.peopleRouteAction
            };
        case businessActions.ActionTypes.GET_SELECT_BUSINESS_SUCCESS:
            let bizwithusers: BusinessWithUsers = action.payload[0];
            if (!bizwithusers.followingUsers) {
                return state;
            }
            return Object.assign({}, updateUsers(state, bizwithusers.followingUsers),
                { fetchedAllUsers: state.fetchedAllUsers });
        default: {
            return state;
        }
    }
};

function updateUsers(state, payload: User[]) {
    const users = payload;
    const newUsers = users.filter(user => !state.entities[user._id]);

    const newUserIds = newUsers.map(user => user._id);
    const newUserEntities = newUsers.reduce((entities: { [id: string]: User }, user: User) => {
        return Object.assign(entities, {
            [user._id]: user
        });
    }, {});

    return {
        ids: [...state.ids, ...newUserIds],
        entities: Object.assign({}, state.entities, newUserEntities),
        selectedUserId: state.selectedUserId,
        peopleRouteAction: state.peopleRouteAction
    };
}

export const getEntities = (state: State) => {
    return state.entities;
};

export const getAllUsersSuccess = (state: State) => {
    return state.fetchedAllUsers;
};

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedUserId;

export const getPeopleRouteAction = (state: State) => state.peopleRouteAction;


export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

export const getSelectedUsersFollowingIds = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId].following;
});

export const getSelectedUsersFollowing = createSelector(getEntities, getSelectedUsersFollowingIds, (entities, followingIds) => {
    return followingIds.map((id: string) => entities[id]);
});

export const getSelectedUsersFollowers = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId].followers;
});
