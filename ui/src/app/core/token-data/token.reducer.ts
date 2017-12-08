import * as tokenActions from './token.action';
import { Tokens } from '../auth-data/auth.model';

const initialState = {} as Tokens;

export function tokensReducer(state = initialState, action:  any) {
    switch (action.type) {
        case tokenActions.ActionTypes.LOGIN_SUCCESS:
        case tokenActions.ActionTypes.STORE_TOKEN_SUCCESS:
            return action.payload;
        case tokenActions.ActionTypes.DELETE_TOKEN:
            return initialState;
        default:
            return state;
    }
};
