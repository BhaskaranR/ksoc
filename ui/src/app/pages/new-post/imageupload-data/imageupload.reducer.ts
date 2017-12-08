import * as imageUploadActions from './imageupload.action';
import * as postActions from '../../../core/post-data/post.action';
import { createSelector } from 'reselect';
import { State, initialState } from './imageupload.model';
import { PhotoDetails } from '../../../core/services/photodetails';

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case imageUploadActions.ActionTypes.EDIT_PHOTO:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedPhoto: action.payload,
        uploadCount: state.uploadCount
      };
    case imageUploadActions.ActionTypes.UPLOAD_TEMP_PHOTO:
      const tempPhotos = action.payload as string[];
      let uploadCount = state.uploadCount;
      const tempPhotoIds = tempPhotos.map(photo => `temp${++uploadCount}`);
      const tempEntities: { [id: string]: null } = {};
      tempPhotoIds.forEach(id => tempEntities[id] = null);

      return {
        ids: [...state.ids, ...tempPhotoIds],
        entities: Object.assign({}, state.entities, tempEntities),
        selectedPhoto: state.selectedPhoto,
        uploadCount: uploadCount
      };
    case imageUploadActions.ActionTypes.CHANGE_PHOTO_SUCCESS:
      const phto = <PhotoDetails>action.payload;
      delete state.entities[phto.key];
      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, phto),
        selectedPhoto: null,
        uploadCount: state.uploadCount
      };
    case imageUploadActions.ActionTypes.UPLOAD_TEMP_PHOTO_SUCCESS:
      const photos = <PhotoDetails[]>action.payload;
      const newPhotos = photos.filter(photo => !state.entities[photo.key]);
      const newPhotoIds = newPhotos.map(photo => photo.key);
      const newPhotoEntities = newPhotos.reduce((entities: { [id: string]: PhotoDetails }, photo: PhotoDetails) => {
        return Object.assign(entities, {
          [photo.key]: photo
        });
      }, {});
      // remove temp upload
      const tempKey = Object.keys(state.entities).filter((ky) => state.entities[ky] === null)[0];
      delete state.entities[tempKey];
      let uc = state.uploadCount - newPhotoIds.length;

      return {
        ids: [...state.ids.filter(ids => ids !== tempKey), ...newPhotoIds],
        entities: Object.assign({}, state.entities, newPhotoEntities),
        selectedPhoto: state.selectedPhoto,
        uploadCount: uc
      };
    case imageUploadActions.ActionTypes.REMOVE_TEMP_PHOTO_SUCCESS:
      const photo = action.payload;
      const ids = state.ids.filter(id => id !== photo.key);
      const currentEntities = ids.reduce((entities: { [id: string]: PhotoDetails }, id: string) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        });
      }, {});
      return Object.assign({}, state, {
        ids: ids,
        entities: currentEntities,
        selectedPhoto: state.selectedPhoto === photo.key ? null : state.selectedPhoto
      });
    case postActions.ActionTypes.POST_COMPLETE:
    case imageUploadActions.ActionTypes.REMOVE_ALL_TEMP_PHOTOS_SUCCESS:
      return Object.assign({}, initialState, {
      });
    default: {
      return state;
    }
  }
};

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedPhoto;



export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
