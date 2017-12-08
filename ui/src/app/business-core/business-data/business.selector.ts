import { createSelector } from 'reselect';
import * as fromBusiness from './business.reducer';
import * as fromCategories from './categories.reducer';
import * as fromAddBiz from './addbusiness.reducer';

import * as fromSubCategories from './subcategories.reducer';
import * as fromProfile from '../../core/profile-data/profile.selector';
import * as fromUsers from '../../core/user-data/user.selector';
import { getAddBizState, getBusinessState, getCategoryState, getSubCategoryState } from '../../reducers';


/* biz categories*/
export const getAllBusinessTypes = createSelector(getCategoryState, fromCategories.getAllBizNames);

export const getAllBizEntities = createSelector(getCategoryState, fromCategories.getBizEntities);
export const getAllCatEntities = createSelector(getCategoryState, fromCategories.getEntities);
export const getAllSubCatEntities = createSelector(getSubCategoryState, fromSubCategories.getCatEntities);


export const getAllBusinessNames = createSelector(getCategoryState, fromCategories.getAllBizNames);


export const getSelectedAddBiz = createSelector(getAddBizState, fromAddBiz.getSelectedBusiness);

export const selectedAddCategory = createSelector(getAddBizState, fromAddBiz.getSelectedCategory);

export const getCatsForSelectedAddBiz = createSelector(getAllBizEntities, getSelectedAddBiz, (entities, selectedbiz) => {
  return entities[selectedbiz];
});

export const getSubCatsForSelectedAddCat = createSelector(getAllSubCatEntities, selectedAddCategory, (entities, selectedcat) => {
  return entities[selectedcat];
});

/* biz categories*/

export const getAllBusinessIds = createSelector(getBusinessState, fromBusiness.getIds);
export const getAllBusinessEnties = createSelector(getBusinessState, fromBusiness.getEntities);

export const getAllBusiness = createSelector(getBusinessState, fromBusiness.getAll);

export const getAllBusinessWithAction = createSelector(getAllBusiness, (biz) => {
  return biz.map(b => { return { 'entity': b, 'action': 'Follow' }; });
});

export const getMyFollowingBusinessWithAction = createSelector(getAllBusinessEnties, fromProfile.getMyFollowingBizIds,
  (allbiz, mybizids) => {
    return mybizids.map(bizid => { return { 'entity': allbiz[bizid], 'action': 'UnFollow' }; });
  });

export const getMyBizGroupWithSettings = createSelector(getAllBusinessEnties, fromProfile.getMyBizIds, (allbiz, mybizids) => {
  /*let publicsetting = { '_id': 'public', name: 'Public', icon: 'public' };
  let friendssetting = { '_id': 'friend', name: 'Friend', icon: 'friends' };
  let privatesetting = { '_id': 'private', name: 'Private', icon: 'private' };
  */
  return mybizids.map(bizid => {
    return {
      '_id': allbiz[bizid]._id, name: allbiz[bizid].title,
      icon: allbiz[bizid].images ? allbiz[bizid].images.small : null,
      type: 'biz'
    };
  });

  // return [publicsetting, privatesetting, friendssetting, ...mybiz];
});

export const getMyBusinessWithAction = createSelector(getAllBusinessEnties, fromProfile.getMyBizIds, (allbiz, mybizids) => {
  return mybizids.map(bizid => { return { 'entity': allbiz[bizid], 'action': '' }; });
});

export const getSelectedBiz = createSelector(getBusinessState, fromBusiness.getSelected);

export const getSelectedBizFollowing = createSelector(getSelectedBiz, fromUsers.getAllUserEnties, (selectedBiz, allUsers) => {
  if (!selectedBiz.following) {
    return null;
  }
  return selectedBiz.following.map(followingid => allUsers[followingid]);
});

export const getSelectedBizIsMine = createSelector(getSelectedBiz, fromProfile.getMeId,
  (selectedBiz, getmeid) => {
    if (!selectedBiz) {
      return false;
    }
    return (selectedBiz.userId === getmeid);
  });
