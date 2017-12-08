import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from './user-model';

export const ActionTypes = {
  GET_ALL_USERS: type('[Users] Get All Users'),
  GET_ALL_USERS_FROM_STORE: type('[Users] Get All Users Fetched From Store'),
  GET_ALL_USERS_SUCCESS: type('[Users] Get All Users Success'),
  GET_ALL_USERS_FAILURE: type('[Users] Get All Users Failue'),
  FOLLOW_USER: type('[User] Follow User'),
  FOLLOW_USER_SUCCESS : type('[User] Follow User Success'),
  FOLLOW_USER_FAILURE : type('[User] Follow User Failure'),
  UNFOLLOW_USER: type('[User] Unfollow User'),
  UNFOLLOW_USER_SUCCESS: type('[User] Unfollow User Success'),
  UNFOLLOW_USER_FAILURE: type('[User] Unfollow User Failure'),
  GET_MY_FOLLOWING: type('[User] Get My Following'),
  GET_MY_FOLLOWING_SUCCESS: type('[User] Get My Following Success'),
  GET_MY_FOLLOWING_FAILURE: type('[User] Get My Following Failure'),
  GET_MY_FOLLOWER: type('[User] Get My Followers'),
  GET_MY_FOLLOWER_SUCCESS: type('[User] Get My Followers Success'),
  GET_MY_FOLLOWER_FAILURE: type('[User] Get My Followers Failure'),
  GET_USER_FOLLOWING: type('[User] Get Users Following'),
  GET_USER_FOLLOWING_SUCCESS: type('[User] Get Users Following Success'),
  GET_USER_FOLLOWING_FAILURE: type('[User] Get Users Following Failure'),
  GET_USER_FOLLOWER: type('[User] Get Users Followers'),
  GET_USER_FOLLOWER_SUCCESS: type('[User] Get Users Followers Success'),
  GET_USER_FOLLOWER_FAILURE: type('[User] Get Users Followers Failure'),
  GET_AND_SELECT_USER : type('[User] Select User'),
  GET_AND_SELECT_USER_SUCCESS: type('[User] Select User Success'),
  GET_AND_SELECT_USER_FAILURE: type('[User] Select User Failure')

};

export class GetAllUsersAction implements Action {
  type = ActionTypes.GET_ALL_USERS;

  constructor() {}
}

export class GetAllUsersFromStoreAction implements Action {
  type = ActionTypes.GET_ALL_USERS_FROM_STORE;

  constructor() {}
}




export class GetAllUsersSuccessAction implements Action {
  type = ActionTypes.GET_ALL_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class GetAllUsersFailureAction implements Action {
  type = ActionTypes.GET_ALL_USERS_FAILURE;

  constructor(public payload: any) {}
}

export class FollowUserAction implements Action {
  type = ActionTypes.FOLLOW_USER;

  constructor(public payload: string) {}
}

export class FollowUserSuccessAction implements Action {
  type = ActionTypes.FOLLOW_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class FollowUserFailureAction implements Action {
  type = ActionTypes.FOLLOW_USER_FAILURE;

  constructor(public payload: any) {}
}

export class UnFollowUserAction implements Action {
  type = ActionTypes.UNFOLLOW_USER;

  constructor(public payload: string) {}
}

export class UnFollowUserSuccessAction implements Action {
  type = ActionTypes.UNFOLLOW_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class UnFollowUserFailureAction implements Action {
  type = ActionTypes.UNFOLLOW_USER_FAILURE;
  constructor(public payload: any) {}
}

export class GetMyFollowingAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING;

  constructor(public payload: string) { }
}

export class GetMyFollowingSuccessAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING_SUCCESS;

  constructor(payload: User[]) { }
}

export class GetMyFollowingFailureAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING_FAILURE;

  constructor(payload: any) { }
}

export class GetMyFollowersAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWER;

  constructor(public payload: string) {}
}


export class GetMyFollowersSuccessAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWER_SUCCESS;

  constructor(payload: User[]) {}
}


export class GetMyFollowersFailureAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWER_FAILURE;

  constructor(public payload: any) {}
}




export class GetUserFollowingAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWING;

  constructor(public payload: string) { }
}

export class GetUserFollowingSuccessAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWING_SUCCESS;

  constructor(payload: User[]) { }
}

export class GetUserFollowingFailureAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWING_FAILURE;

  constructor(payload: any) { }
}

export class GetUserFollowersAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWER;

  constructor(public payload: string) {}
}


export class GetUserFollowersSuccessAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWER_SUCCESS;

  constructor(payload: User[]) {}
}


export class GetUserFollowersFailureAction implements Action {
  type = ActionTypes.GET_USER_FOLLOWER_FAILURE;

  constructor(public payload: any) {}
}


export class GetAndSelectUserAction implements Action {
  type = ActionTypes.GET_AND_SELECT_USER;

  constructor(public payload: string) {}
}

export class GetAndSelectUserSuccesAction implements Action {
  type = ActionTypes.GET_AND_SELECT_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class GetAndSelectUserFailureAction implements Action {
  type = ActionTypes.GET_AND_SELECT_USER_FAILURE;

  constructor(public payload: any) {}
}

export type Actions
  = GetAllUsersAction
    | GetAllUsersSuccessAction
    | GetAllUsersFailureAction
    | GetAllUsersFromStoreAction
    | GetUserFollowingAction
    | GetUserFollowingSuccessAction
    | GetUserFollowingFailureAction
    | FollowUserAction
    | FollowUserSuccessAction
    | FollowUserFailureAction
    | UnFollowUserAction
    | UnFollowUserSuccessAction
    | UnFollowUserFailureAction
    | GetUserFollowersAction
    | GetUserFollowersSuccessAction
    | GetUserFollowersFailureAction
    | GetMyFollowingAction
    | GetMyFollowingSuccessAction
    | GetMyFollowingFailureAction
    | GetMyFollowersAction
    | GetMyFollowersSuccessAction
    | GetMyFollowersFailureAction
    | GetAndSelectUserAction
    | GetAndSelectUserSuccesAction
    | GetAndSelectUserFailureAction;
