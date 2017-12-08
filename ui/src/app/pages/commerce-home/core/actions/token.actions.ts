import { Action } from '@ngrx/store';
import { AdminToken } from '../models/admin-token.model';

export const TOKEN_GET_REQUESTED = '[AdminToken] Admin Token Get Requested';
export const TOKEN_GET_COMPLETED = '[AdminToken] Admin Token Get Completed';

export class TokenPayload {
    constructor(public token: AdminToken[]) { }
}

export class LoadAdminTokenRequestedAction implements Action {
    readonly type = TOKEN_GET_REQUESTED;

    constructor(public payload = null) { }
} 

export class LoadAdminTokenCompletedAction implements Action {
    readonly type = TOKEN_GET_COMPLETED;

    constructor(public payload: TokenPayload) { }
} 

export type All
    = LoadAdminTokenRequestedAction
    | LoadAdminTokenCompletedAction;