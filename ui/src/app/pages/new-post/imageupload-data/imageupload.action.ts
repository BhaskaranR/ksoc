import { Action } from '@ngrx/store';
import { PhotoDetails } from '../../../core/services/photodetails';
import { type } from '../../../core/util';


export const ActionTypes = {
  EDIT_PHOTO: type('[Image Upload] Edit a photo'),
  CHANGE_PHOTO: type('[Image Upload] Change Photo'),
  CHANGE_PHOTO_SUCCESS: type('[Image Upload] Change photo Success'),
  CHANGE_PHOTO_FAILURE: type('[Image Upload] Change photo Failure'),
  CANCEL_PHOTO_EDIT: type('[Image Upload] Cancel photo edit'),
  SAVE_EDITED_PHOTO: type('[Image Upload] Save edited photo'),
  SAVE_EDITED_PHOTO_SUCCESS: type('[Image Upload] Save edited photo success'),
  SAVE_EDITED_PHOTO_FAILURE: type('[Image Upload] Save edited photo failure'),
  LOAD_INITIAL_STATE: type('[Image Upload] Set Initial State'),
  LOAD_INITIAL_STATE_SUCCESS: type('[Image Upload] Set Initial State Success'),
  LOAD_INITIAL_STATE_FAILURE: type('[Image Upload] Set Initial State Failure'),
  UPLOAD_TEMP_PHOTO: type('[Image Upload] Temp Upload Image'),
  UPLOAD_TEMP_PHOTO_SUCCESS: type('[Image Upload] Temp Upload Image Success'),
  UPLOAD_TEMP_PHOTO_FAILURE: type('[Image Upload] Temp Upload Image Failure'),
  REMOVE_TEMP_PHOTO: type('[Image Upload] Remove Temp Photo'),
  REMOVE_TEMP_PHOTO_SUCCESS: type('[Image Upload] Remove Temp Photo Sucess'),
  REMOVE_TEMP_PHOTO_FAILURE: type('[Image Upload] Remove Temp Photo Failure'),
  REMOVE_ALL_TEMP_PHOTOS: type('[Image Upload] Remove All Photos'),
  REMOVE_ALL_TEMP_PHOTOS_SUCCESS: type('[Image Upload] Remove All Photos Success'),
  REMOVE_ALL_TEMP_PHOTOS_FAILURE: type('[Image Upload] Remove All Photos Failure')
};

export class EditPhotoAction implements Action {
  type = ActionTypes.EDIT_PHOTO
  constructor(public payload : string) {}
}

export class ChangePhotoAction implements Action {
  type = ActionTypes.CHANGE_PHOTO
  constructor(public payload : string) {}
}

export class ChangePhotoSuccessAction implements Action {
  type = ActionTypes.CHANGE_PHOTO_SUCCESS
  constructor(public payload : PhotoDetails) {}
}

export class ChangePhotoFailureAction implements Action {
  type = ActionTypes.CHANGE_PHOTO_FAILURE
  constructor(public payload : any) {}
}

export class LoadInitialStateAction implements Action {
  type = ActionTypes.LOAD_INITIAL_STATE;

  constructor() { }
}

export class LoadInitialStateActionSuccess implements Action {
  type = ActionTypes.LOAD_INITIAL_STATE_SUCCESS;

  constructor(public payload: string) { }
}


export class LoadInitialStateActionFailure implements Action {
  type = ActionTypes.LOAD_INITIAL_STATE_FAILURE;

  constructor(public payload: any) { }
}


export class UploadTempPhotoAction implements Action {
  type = ActionTypes.UPLOAD_TEMP_PHOTO;

  constructor(public payload: string[]) { }
}

export class UploadTempPhotoActionSuccess implements Action {
  type = ActionTypes.UPLOAD_TEMP_PHOTO_SUCCESS;

  constructor(public payload: any) { }
}

export class UploadTempPhotoActionFailure implements Action {
  type = ActionTypes.UPLOAD_TEMP_PHOTO_FAILURE;

  constructor(public payload: any) { }
}

export class RemoveTempPhotoAction implements Action {
  type = ActionTypes.REMOVE_TEMP_PHOTO;

  constructor(public payload: string) { }
}

export class RemoveTempPhotoActionSuccess implements Action {
  type = ActionTypes.REMOVE_TEMP_PHOTO_SUCCESS;

  constructor() { }
}

export class RemoveTempPhotoActionFailure implements Action {
  type = ActionTypes.REMOVE_TEMP_PHOTO_FAILURE;

  constructor(public payload: any) { }
}

export class RemoveAllTempPhotoAction implements Action {
  type = ActionTypes.REMOVE_ALL_TEMP_PHOTOS;

  constructor(public payload: string) { }
}

export class RemoveAllTempPhotoActionSuccess implements Action {
  type = ActionTypes.REMOVE_ALL_TEMP_PHOTOS_SUCCESS;

  constructor() { }
}

export class RemoveAllTempPhotoActionFailure implements Action {
  type = ActionTypes.REMOVE_ALL_TEMP_PHOTOS_FAILURE;

  constructor(public payload: any) { }
}

export type Actions
  = LoadInitialStateAction
  | LoadInitialStateActionSuccess
  | LoadInitialStateActionFailure
  | UploadTempPhotoAction
  | UploadTempPhotoActionSuccess
  | UploadTempPhotoActionFailure
  | RemoveTempPhotoAction
  | RemoveTempPhotoActionSuccess
  | RemoveTempPhotoActionFailure
  | RemoveAllTempPhotoAction
  | RemoveAllTempPhotoActionSuccess
  | RemoveAllTempPhotoActionFailure
  | EditPhotoAction
  | ChangePhotoAction
  | ChangePhotoSuccessAction
  | ChangePhotoFailureAction;
