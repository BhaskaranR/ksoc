import { createSelector } from 'reselect';
import {  AppState } from '../../reducers';
import * as fromApp from './app.reducer';

export const appDataState  = (state: AppState) => {
  return state.appData;
};
export const getSiteIconSrc = createSelector(appDataState, fromApp.getSiteIconSrc);
export const getSiteTitle = createSelector(appDataState, fromApp.getSiteTitle);
// export const getRoutes = createSelector(appDataState, fromApp.getRoutes);
export const getAnimationData = createSelector(appDataState, fromApp.getAnimationData);
export const getPathToIndex = createSelector(appDataState, fromApp.getPathToIndex);
export const getAdminState = createSelector(appDataState, fromApp.getAdminState);
export const getSideNavState = createSelector(appDataState, fromApp.getSideNavState);
export const getPrevRoute = createSelector(appDataState, fromApp.getPrevRoute );
