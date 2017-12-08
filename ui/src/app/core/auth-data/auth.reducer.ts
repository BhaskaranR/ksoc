import {Action } from '@ngrx/store';

export function loggedInReducer(state = false, action: Action) {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            return true;
        case 'NOT_LOGGED_IN':
            return false;
        default:
            return state;
    }
};

 export function authReadyReducer(state = false, action: Action)  {
    switch (action.type) {
        case 'AUTH_READY':
            return true;
        default:
            return state;
    }
};


export const getToken = (state) => state.tokens;
