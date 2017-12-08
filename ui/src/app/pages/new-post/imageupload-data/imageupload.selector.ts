import { AppState } from '../../../reducers';
import { createSelector } from 'reselect';
import * as fromImageUpload from './imageupload.reducer';

export const getImageUploadState = (state: AppState) => state.tempImages;

export const getAll = createSelector(getImageUploadState, fromImageUpload.getAll);

export const getSelectedImage = createSelector(getImageUploadState, fromImageUpload.getSelected );
