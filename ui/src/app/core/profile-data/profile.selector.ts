import { createSelector } from 'reselect';
import { getMyProfile } from '../../reducers';
import * as fromMe from './profile.reducer';

export const getMe = createSelector(getMyProfile, fromMe.getMe);

export const getMeId = createSelector(getMyProfile, fromMe.getMyId);

export const getMyImage = createSelector(getMyProfile, fromMe.getMyImage);

export const getMyBgImage = createSelector(getMyProfile, fromMe.getMyBgImage);

export const getMySettings = createSelector(getMyProfile, fromMe.getSettings);

export const getMyBizIds = createSelector(getMyProfile, fromMe.getMyBizIds);

export const getMyFollowingBizIds = createSelector(getMyProfile, fromMe.getMyFollowingBizIds);
