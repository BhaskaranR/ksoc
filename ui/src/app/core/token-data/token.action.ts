import { Action } from '@ngrx/store';
import { Tokens, LoginSubmitPayload,  RegistrationSubmitPayload } from '../auth-data/auth.model';
import { type } from '../util';

export const ActionTypes = {
    LOGIN : type('[Tokens] Login User'),
    LOGIN_SUCCESS: type('[Tokens] Login User Success'),
    LOGIN_FAILURE: type('[Tokens] Login User Failure'),
    WEBPUSH_LOGIN_SUCCESS: type('[Tokens] Firebase Login Success'),
    WEBPUSH_LOGIN_FAILURE: type('[Tokens] Firebase Login Failure'),
    LOAD_TOKEN: type('[Tokens] Load Token'),
    STORE_TOKEN_SUCCESS: type('[Tokens] Store Token Success'),
    STORE_TOKEN_FAIL: type('[Tokens] Store Token Fail'),
    DELETE_TOKEN: type('[Tokens] Delete Token'),
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: LoginSubmitPayload) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Tokens) { }
}

export class LoginFailureAction implements Action {
  type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) { }
}

export class WebPushSuccessAction implements Action {
  type = ActionTypes.WEBPUSH_LOGIN_SUCCESS;

  constructor() { }
}

export class WebPushFailureAction implements Action {
  type = ActionTypes.WEBPUSH_LOGIN_FAILURE;

  constructor(public payload: any) { }
}


export class LoadTokenAction implements Action {
  type = ActionTypes.LOAD_TOKEN;

  constructor() { }
}

export class StoreTokenSuccessAction implements Action {
  type = ActionTypes.STORE_TOKEN_SUCCESS;

  constructor(public payload: Tokens) { }
}

export class StoreTokenFailureAction implements Action {
  type = ActionTypes.STORE_TOKEN_FAIL;

  constructor(public payload: any) { }
}

export class DeleteTokenAction implements Action {
  type = ActionTypes.DELETE_TOKEN;

  constructor() { }
}

export type Actions
  =
  LoginAction
  |LoginSuccessAction
  |LoginFailureAction
  |LoadTokenAction
  |StoreTokenSuccessAction
  |StoreTokenFailureAction
  |DeleteTokenAction
  |WebPushSuccessAction
  |WebPushFailureAction;
