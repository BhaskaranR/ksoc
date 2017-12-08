import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../user-data/user-model';
import { PhotoDetails } from '../services/photodetails';


export const ActionTypes = {
  SELECT_PROFILE: type('[User] Select Profile'),
  REMOVE_PROFILE: type('[User] Remove My Profile'),
  REMOVE_PROFILE_SUCCESS: type('[User] Remove My Profile Success'),
  REMOVE_PROFILE_FAILURE: type('[User] Remove My Profile Failure'),
  GET_MY_PROFILE_REQUEST: type('[User] Get My Profile Failure'),
  GET_PROFILE_REQUEST: type('[User] Profile Request'),
  STORE_PROFILE: type('[User] Store My Profile'),
  STORE_PROFILE_SUCCESS: type('[User] Store My Profile Success'),
  STORE_PROFILE_FAILURE: type('[User] Store My Profile Failure'),
  PROFILE_UPDATE_REQUEST: type('[User] Profile Update Request'),
  PROFILE_UPDATE_SUCCESS: type('[User] Profile Update Success'),
  BG_IMAGE_UPDATE_SUCCESS: type('[User] Profile BG Image Update Success'),
  IMAGE_UPDATE_SUCCESS: type('[User] Profile Image Update Success'),
  PROFILE_UPDATE_FAILURE: type('[User] Profile Update Failure'),
  ON_PROFILE_FORM_FIELD_CHANGE: type('[User] Profile Form Field Change'),
  GET_MY_FOLLOWERS: type('[User] Get My Users Followers'),
  GET_MY_FOLLOWERS_SUCCESS: type('[User] Get My Users Followers Success'),
  GET_MY_FOLLOWERS_FAILURE: type('[User] Get My Users Followers Failure'),
  GET_MY_FOLLOWING: type('[User] Get My Users Following'),
  GET_MY_FOLLOWING_SUCCESS: type('[User] Get My Users Following Success'),
  GET_MY_FOLLOWING_FAILURE: type('[User] Get My Users Following Failure'),
  GET_MY_FOLLOWING_FROM_STORE: type('[User] Get My Users Following From Store'),

  UPDATE_SETTINGS: type('[User] Update Settings'),
  UPDATE_SETTINGS_SUCCESS: type('[User] Update Settings Success'),
  UPDATE_SETTINGS_FAILURE: type('[User] Update Settings Failure'),

  UPDATE_USER_PERSONAL_INFO: type('[User] Update User Personal Info'),
  UPDATE_USER_PERSONAL_INFO_SUCCESS: type('[User] Update User Personal Info Success'),
  UPDATE_USER_PERSONAL_INFO_FAILURE: type('[User] Update User Personal Info Failure'),

  UPDATE_USER_PERSONAL_CONTACT: type('[User] Update User Personal Contact'),
  UPDATE_USER_PERSONAL_CONTACT_SUCCESS: type('[User] Update User Personal Contact Success'),
  UPDATE_USER_PERSONAL_CONTACT_FAILURE: type('[User] Update User Personal Contact Failure'),

  UPDATE_USER_CUSTOM_URLS: type('[User] Update User Custom Urls'),
  UPDATE_USER_CUSTOM_URLS_SUCCESS: type('[User] Update User Custom Urls Success'),
  UPDATE_USER_CUSTOM_URLS_FAILURE: type('[User] Update User Custom Urls Failure'),

  UPDATE_USER_PLACES_HISTORY: type('[User] Update User Places History'),
  UPDATE_USER_PLACES_HISTORY_SUCCESS: type('[User] Update User Places History Success'),
  UPDATE_USER_PLACES_HISTORY_FAILURE: type('[User] Update User Places History Failure'),

  UPDATE_USER_EDUCATION_HISTORY: type('[User] Update User Education History'),
  UPDATE_USER_EDUCATION_HISTORY_SUCCESS: type('[User] Update User Education History Success'),
  UPDATE_USER_EDUCATION_HISTORY_FAILURE: type('[User] Update User Education History Failure'),

  UPDATE_USER_WORK_HISTORY: type('[User] Update User Work History'),
  UPDATE_USER_WORK_HISTORY_SUCCESS: type('[User] Update User Work History Success'),
  UPDATE_USER_WORK_HISTORY_FAILURE: type('[User] Update User Work History Failure'),

  UPDATE_USER_STORY: type('[User] Update User Story'),
  UPDATE_USER_STORY_SUCCESS: type('[User] Update User Story Success'),
  UPDATE_USER_STORY_FAILURE: type('[User] Update User Story Failure'),

  CHANGE_PASSWORD: type('[User] Change User Password'),
  CHANGE_PASSWORD_SUCCESS: type('[User] Change User Password Success'),
  CHANGE_PASSWORD_FAILURE: type('[User] Change User Password Failure'),
  FORGOT_PASSWORD: type('[User] Forgot User Password'),
  FORGOT_PASSWORD_SUCCESS: type('[User] Forgot User Password Success'),
  FORGOT_PASSWORD_FAILURE: type('[User] Forgot User Password Failure')
};


export class ForgotUserPassword implements Action {
  type = ActionTypes.FORGOT_PASSWORD;
  constructor(public payload: string) { }
}

export class ForgotUserPasswordSuccess implements Action {
  type = ActionTypes.FORGOT_PASSWORD_SUCCESS;
  constructor() { }
}

export class ForgotUserPasswordFailure implements Action {
  type = ActionTypes.FORGOT_PASSWORD_FAILURE;

  constructor(public payload: string) { }
}

export class ChangeUserPassword implements Action {
  type = ActionTypes.CHANGE_PASSWORD;
  constructor(public payload: { old_password: string, new_password: string }) { }
}

export class ChangeUserPasswordSuccess implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor() { }
}

export class ChangeUserPasswordFailure implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAILURE;

  constructor(public payload: string) { }
}



export class UpdateSettings implements Action {
  type = ActionTypes.UPDATE_SETTINGS;
  constructor(public payload: any) { }
}
export class UpdateSettingsSuccess implements Action {
  type = ActionTypes.UPDATE_SETTINGS_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateSettingsFailure implements Action {
  type = ActionTypes.UPDATE_SETTINGS_FAILURE;
  constructor(public payload: any) { }
}

export class UpdateUserPersonalInfo implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_INFO;
  constructor(public payload: any) { }
}
export class UpdateUserPersonalInfoSuccess implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_INFO_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserPersonalInfoFailure implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_INFO_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserPersonalContact implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_CONTACT;
  constructor(public payload: any) { }
}
export class UpdateUserPersonalContactSuccess implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_CONTACT_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserPersonalContactFailure implements Action {
  type = ActionTypes.UPDATE_USER_PERSONAL_CONTACT_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserCustomUrls implements Action {
  type = ActionTypes.UPDATE_USER_CUSTOM_URLS;
  constructor(public payload: any) { }
}
export class UpdateUserCustomUrlsSuccess implements Action {
  type = ActionTypes.UPDATE_USER_CUSTOM_URLS_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserCustomUrlsFailure implements Action {
  type = ActionTypes.UPDATE_USER_CUSTOM_URLS_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserPlacesHistory implements Action {
  type = ActionTypes.UPDATE_USER_PLACES_HISTORY;
  constructor(public payload: any) { }
}
export class UpdateUserPlacesHistorySuccess implements Action {
  type = ActionTypes.UPDATE_USER_PLACES_HISTORY_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserPlacesHistoryFailure implements Action {
  type = ActionTypes.UPDATE_USER_PLACES_HISTORY_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserEducationHistory implements Action {
  type = ActionTypes.UPDATE_USER_EDUCATION_HISTORY;
  constructor(public payload: any) { }
}
export class UpdateUserEducationHistorySuccess implements Action {
  type = ActionTypes.UPDATE_USER_EDUCATION_HISTORY_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserEducationHistoryFailure implements Action {
  type = ActionTypes.UPDATE_USER_EDUCATION_HISTORY_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserWorkHistory implements Action {
  type = ActionTypes.UPDATE_USER_WORK_HISTORY;
  constructor(public payload: any) { }
}
export class UpdateUserWorkHistorySuccess implements Action {
  type = ActionTypes.UPDATE_USER_WORK_HISTORY_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserWorkHistoryFailure implements Action {
  type = ActionTypes.UPDATE_USER_WORK_HISTORY_FAILURE;
  constructor(public payload: any) { }
}
export class UpdateUserStory implements Action {
  type = ActionTypes.UPDATE_USER_STORY;
  constructor(public payload: any) { }
}
export class UpdateUserStorySuccess implements Action {
  type = ActionTypes.UPDATE_USER_STORY_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserStoryFailure implements Action {
  type = ActionTypes.UPDATE_USER_STORY_FAILURE;
  constructor(public payload: any) { }
}


export class GetMyFollowersAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWERS
  constructor() { }
}

export class GetMyFollowersSuccessAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWERS_SUCCESS
  constructor(public payload: User[]) { }
}

export class GetMyFollowersFailureAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWERS_FAILURE
  constructor() { }
}

export class GetMyFollowingAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING;
  constructor() { }
}

export class GetMyFollowingSuccessAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING_SUCCESS;
  constructor(public payload: User[]) { }
}

export class GetMyFollowingFailureAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING_FAILURE;
  constructor(public payload: any) { }
}

export class GetMyFollowingFromStoreAction implements Action {
  type = ActionTypes.GET_MY_FOLLOWING_FROM_STORE;
  constructor() { }
}


export class SelectProfileAction implements Action {
  type = ActionTypes.SELECT_PROFILE;

  constructor(public payload: string) { }
}

export class RemoveProfileAction implements Action {
  type = ActionTypes.REMOVE_PROFILE;

  constructor(public payload: User) { }
}

export class RemoveProfileSuccessAction implements Action {
  type = ActionTypes.REMOVE_PROFILE_SUCCESS;

  constructor(public payload: User) { }
}

export class RemoveProfileFailureAction implements Action {
  type = ActionTypes.REMOVE_PROFILE_FAILURE;
  constructor(public payload: any) { }
}

export class StoreProfileAction implements Action {
  type = ActionTypes.STORE_PROFILE;

  constructor(public payload: User) { }
}

export class StoreProfileSuccessAction implements Action {
  type = ActionTypes.STORE_PROFILE_SUCCESS;

  constructor(public payload: User) { }
}

export class UpdateProfileBGImageSuccessAction implements Action {
  type = ActionTypes.BG_IMAGE_UPDATE_SUCCESS;

  constructor(public payload: PhotoDetails) { }
}

export class UpdateProfileImageSuccessAction implements Action {
  type = ActionTypes.IMAGE_UPDATE_SUCCESS;

  constructor(public payload: PhotoDetails) { }
}

export class StoreProfileFailureAction implements Action {
  type = ActionTypes.STORE_PROFILE_FAILURE;
  constructor(public payload: any) { }
}

export class GetMyProfileRequestAction implements Action {
  type = ActionTypes.GET_MY_PROFILE_REQUEST;

  constructor() { }
}

export class GetProfileRequestAction implements Action {
  type = ActionTypes.GET_PROFILE_REQUEST;

  constructor(public payload: string | null) { }
}

export class UpdateProfileRequestAction implements Action {
  type = ActionTypes.PROFILE_UPDATE_REQUEST;

  constructor(public payload: User) { }
}

export class UpdateProfileSuccessAction implements Action {
  type = ActionTypes.PROFILE_UPDATE_SUCCESS;

  constructor(public payload: User) { }
}

export class UpdateProfileFailureAction implements Action {
  type = ActionTypes.PROFILE_UPDATE_FAILURE;

  constructor(public payload: any) { }
}


export type Actions
  =
  SelectProfileAction
  | UpdateProfileBGImageSuccessAction
  | UpdateProfileImageSuccessAction
  | RemoveProfileAction
  | RemoveProfileSuccessAction
  | RemoveProfileFailureAction
  | StoreProfileAction
  | StoreProfileSuccessAction
  | StoreProfileFailureAction
  | GetMyProfileRequestAction
  | GetProfileRequestAction
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailureAction
  | GetMyFollowersAction
  | GetMyFollowersSuccessAction
  | GetMyFollowersFailureAction
  | GetMyFollowingAction
  | GetMyFollowingSuccessAction
  | GetMyFollowingFailureAction
  | GetMyFollowingFromStoreAction
  | UpdateSettings
  | UpdateSettingsSuccess
  | UpdateSettingsFailure
  | UpdateUserPersonalInfo
  | UpdateUserPersonalInfoSuccess
  | UpdateUserPersonalInfoFailure
  | UpdateUserPersonalContact
  | UpdateUserPersonalContactSuccess
  | UpdateUserPersonalContactFailure
  | UpdateUserCustomUrls
  | UpdateUserCustomUrlsSuccess
  | UpdateUserCustomUrlsFailure
  | UpdateUserPlacesHistory
  | UpdateUserPlacesHistorySuccess
  | UpdateUserPlacesHistoryFailure
  | UpdateUserEducationHistory
  | UpdateUserEducationHistorySuccess
  | UpdateUserEducationHistoryFailure
  | UpdateUserWorkHistory
  | UpdateUserWorkHistorySuccess
  | UpdateUserWorkHistoryFailure
  | UpdateUserStory
  | UpdateUserStorySuccess
  | UpdateUserStoryFailure
  | ChangeUserPassword
  | ChangeUserPasswordSuccess
  | ChangeUserPasswordFailure
  | ForgotUserPassword
  | ForgotUserPasswordSuccess
  | ForgotUserPasswordFailure;
