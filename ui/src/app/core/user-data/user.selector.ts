import { createSelector } from 'reselect';
import { getMyProfile, getUserState } from '../../reducers';
import * as fromUser from './user.reducer';
import * as fromProfile from '../profile-data/profile.reducer';
import { User } from './user-model';


export const getUsersSuccess = createSelector(getUserState, fromUser.getAllUsersSuccess);

export const getAllUsersSuccess = createSelector(getUsersSuccess, (success) => {
  return success;
});

export const getAllUserIds = createSelector(getUserState, fromUser.getIds);
export const getAllUserEnties = createSelector(getUserState, fromUser.getEntities);
export const peoplerouteaction = createSelector(getUserState, fromUser.getPeopleRouteAction);

/* For my Followers | Following */

export const getMyFollowingUserIds = createSelector(getMyProfile, fromProfile.getFollowingIds);

export const getMyFollowers = createSelector(getMyProfile, fromProfile.getFollowers);

export const getSuggestUserIds = createSelector(getAllUserIds, getMyFollowingUserIds, (allUsers, followingUsers) => {
  return allUsers.filter(user => !followingUsers.includes(user));
});

export const getSuggestedUsers = createSelector(getAllUserEnties, getSuggestUserIds, (entities, ids) => {
  return ids.map(id => {
    return { 'entity': entities[id], 'action': 'Follow' };
  });
});

export const getMyFollowersNotFollowingIds = createSelector(getMyFollowers, getMyFollowingUserIds, (followers, following) => {
  {
    const ids = followers.filter(user => following.includes(user._id));
    const idKeyVal = ids.reduce((ids: { [id: string]: string }, user: User) => {
      return Object.assign(ids, {
        [user._id]: user
      });
    }, {});
    return idKeyVal;
  }
});

export const getMyFollowing = createSelector(getAllUserEnties, getMyFollowingUserIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const getMyFollowingWithAction = createSelector(getMyFollowing,  (following) => {
  return following.map(user => {
    return { 'entity': user, 'action': 'UnFollow' };
  });
});

export const getMyFollowersWithAction = createSelector(getMyFollowers, getMyFollowersNotFollowingIds,
  (followers: User[], notFollowingIds) => {
    return followers.map(follower => {
      return { 'entity': follower, 'action': notFollowingIds[follower._id] ? 'UnFollow' : 'Follow' };
    });
  });

/* for Selected Users following and followers */


export const getSelectedUser = createSelector(getUserState, fromUser.getSelected);

export const getSelectedUserFollowing = createSelector(getUserState, fromUser.getSelectedUsersFollowing);


export const getSelectedUserFollowers = createSelector(getUserState, fromUser.getSelectedUsersFollowers);


export const getSelectedUserFollowingWithAction =
  createSelector(getSelectedUserFollowing, getMyFollowingUserIds, (selFollowing, myFollowingIds) => {
    return selFollowing.map(sf => {
      return { 'entity': sf, 'action': myFollowingIds[sf._id] ? 'UnFollow' : 'Follow' };
    });
  });
export const getSelectedUserFollowingMentions =
  createSelector(getSelectedUserFollowing, getMyFollowingUserIds, (selFollowing, myFollowingIds) => {
    return selFollowing.map(sfm => {
      return sfm;
    });
  });

export const getSelectedUserFollowersWithAction =
  createSelector(getSelectedUserFollowers, getMyFollowingUserIds, (selFollowers, myFollowingIds) => {
    return selFollowers.map(sf => {
      return { 'entity': sf, 'action': myFollowingIds[sf._id] ? 'UnFollow' : 'Follow' };
    });
  });

export const getSelectedUserIsMyFollowing =
  createSelector(getMyFollowingUserIds, getSelectedUser, (getmyFollowingUsers, selectedUser) =>
    selectedUser && getmyFollowingUsers.some(my => my === selectedUser._id)
  );

export const getUsers = createSelector(getSuggestedUsers, getMyFollowersWithAction,
  getMyFollowingWithAction, peoplerouteaction, (suggestedusers, followerswithaction,
    followingwithaction, pa) => {
    if (pa === 0) {
      return getSuggestedUsers;
    } else if (pa === 1) {
      return followerswithaction;
    } else {
      return followingwithaction;
    }
  });
