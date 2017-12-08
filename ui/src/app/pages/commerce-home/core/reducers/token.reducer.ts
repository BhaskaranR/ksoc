import * as tokenActions from '../actions/token.actions';
import { AdminToken } from '../models/admin-token.model';

export type Action = tokenActions.All;

export interface TokenState {
    admin_token: AdminToken[];
    isLoadingToken: boolean;
    error: any;
    //courseLessons: Lesson[];
}

export const courseInitialState: TokenState = {
    admin_token: null,
    isLoadingToken: true,
    error: null
}

export function tokenReducer(state: AdminToken, action: Action) {
    switch (action.type) {
        case tokenActions.TOKEN_GET_REQUESTED: {
            return Object.assign({}, state, {
                admin_token: null,
                isLoadingToken: true,
                error: null
            });
        }
        case tokenActions.TOKEN_GET_COMPLETED: {
            return Object.assign({}, state, {
                admin_token: action.payload.token,
                isLoadingToken: false,
                error: null
            });
        }
        default:
            return state;
    }
}

