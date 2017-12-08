import * as profileActions from './profile.action';
import * as businessActions from '../../business-core/business-data/business.action';
import * as userActions from '../user-data/user.action';
import { User } from '../user-data/user-model';
import { Business } from '../../business-core/business-data/business.model';

const initialState: User = {
    _id: '',
    fbId: '',
    googlePlusId: '',
    firstName: '',
    lastName: '',
    mail: '',
    userPersonalContact: null,
    personalInfo: null,
    personalContact: null,
    userCustomUrls: null,
    placesHistory: null,
    workHistory: null,
    educationHistory: null,
    userStory: null,
    requesting_device_id: '',
    strategy: '',
    avatarId: 'svg-1',
    profileSet: false,
    images: {
        xlarge: '',
        large: '',
        normal: '',
        small: '',
        key: '',
        ext: ''
    },
    backgroundImage: {
        xlarge: '',
        large: '',
        normal: '',
        key: '',
        small: '',
        ext: ''
    },
    followers: [],
    following: [],
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    createdAt: '',
    modifiedAt: '',
    settings: {
        notifyposts: 'public',
        listposts: 'public',
        commentposts: 'public',
        profile: 'public',
        following: 'public',
        enablenotifications: 'true',
        enableemail: 'true'
    },
    followingBusiness: [],
    mybusinesses: []
};

export function profileReducer(state = initialState, action: any): User {
    switch (action.type) {
        case profileActions.ActionTypes.STORE_PROFILE_SUCCESS:
        case profileActions.ActionTypes.PROFILE_UPDATE_SUCCESS:
            const user: User = action.payload;
            let mybiz: any;
            if (action.payload.mybusinesses !== undefined && !action.payload.mybusinesses.isBoom) {
                mybiz = action.payload.mybusinesses.map(biz => biz._id);
            } else {
                mybiz = [];
            }
            if (action.payload) {
                return Object.assign({}, state, {
                    profileSet: true,
                    _id: user._id,
                    fbId: user.fbId,
                    googlePlusId: user.googlePlusId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mail: user.mail,
                    userPersonalContact: user.personalContact,
                    userCustomUrls: user.settings ? user.settings.siteUrls : state.userCustomUrls,
                    userPlacesHistory: user.placesHistory,
                    personalInfo: user.personalInfo,
                    userWorkHistory: user.workHistory,
                    userEducationHistory: user.educationHistory,
                    userStory: user.userStory,
                    images: Object.assign({}, state.images, user.images),
                    backgroundImage: Object.assign({}, state.backgroundImage, user.backgroundImage),
                    defaultProfile: true,
                    followers: [...state.followers],
                    following: [...state.following, ...user.following],
                    followersCount: user.followersCount ? user.followersCount : 0,
                    followingCount: user.followingCount ? user.followingCount : 0,
                    postsCount: user.postsCount ? user.postsCount : 0,
                    createdAt: user.createdAt,
                    modifiedAt: user.modifiedAt,
                    settings: Object.assign({}, user.settings ? user.settings : state.settings),
                    business: [],
                    mybusinesses: [...state.mybusinesses, ...mybiz],
                    followingBusiness: state.followingBusiness
                });
            }
            return initialState;
        case profileActions.ActionTypes.IMAGE_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                images: action.payload
            });
        case profileActions.ActionTypes.BG_IMAGE_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                backgroundImage: action.payload
            });
        case userActions.ActionTypes.UNFOLLOW_USER_SUCCESS:
        case userActions.ActionTypes.FOLLOW_USER_SUCCESS:
            if (action.payload) {
                return Object.assign({}, state, {
                    following: [...action.payload.following],
                    followingCount: action.payload.following.length
                });
            }
            return state;
        case userActions.ActionTypes.GET_MY_FOLLOWING_SUCCESS:
            if (action.payload) {
                return Object.assign({}, state, {
                    following: [...action.payload]
                });
            }
            return state;
        case profileActions.ActionTypes.GET_MY_FOLLOWERS_SUCCESS:
            if (action.payload) {
                return Object.assign({}, state, {
                    followers: [...action.payload]
                });
            }
            return state;
        case profileActions.ActionTypes.PROFILE_UPDATE_FAILURE:
            return state;
        case profileActions.ActionTypes.UPDATE_SETTINGS_SUCCESS:
            return Object.assign({}, state, {
                settings: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_CUSTOM_URLS_SUCCESS:
            return Object.assign({}, state, {
              userCustomUrls: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_EDUCATION_HISTORY_SUCCESS:
            return Object.assign({}, state, {
              userEducationHistory: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_WORK_HISTORY_SUCCESS:
            return Object.assign({}, state, {
              userWorkHistory: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_PERSONAL_CONTACT_SUCCESS:
            return Object.assign({}, state, {
              userPersonalContact: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_PLACES_HISTORY_SUCCESS:
            return Object.assign({}, state, {
              userPlacesHistory: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_STORY_SUCCESS:
            return Object.assign({}, state, {
                settings: action.payload
            });
        case profileActions.ActionTypes.UPDATE_USER_PERSONAL_INFO_SUCCESS:
            return Object.assign({}, state, {
              personalInfo: action.payload
            });
        case businessActions.ActionTypes.GET_MYBUSINESS_FOLLOWING_SUCCESS:
            const followingbizs: Business[] = action.payload;
            return Object.assign({}, state, {
                followingBusiness: followingbizs.map(biz => biz._id)
            });
        case businessActions.ActionTypes.FOLLOW_BUSINESS_SUCCESS:
            const followbiz: Business = action.payload;
            return Object.assign({}, state, {
                followingBusiness: [...state.followingBusiness, followbiz._id]
            });
        case businessActions.ActionTypes.UNFOLLOW_BUSINESS_SUCCESS:
            const unfollowbiz: Business = action.payload;
            return Object.assign({}, state, {
                followingBusiness: state.followingBusiness.filter(bizId => bizId !== unfollowbiz._id)
            });
        case businessActions.ActionTypes.ADD_NEW_BUSINESS_SUCCESS:
            const addBiz: Business[] = action.payload;
            return Object.assign({}, state, {
                mybusinesses: [...state.mybusinesses, ...addBiz.map(biz => biz._id)]
            });
        case businessActions.ActionTypes.GET_MYBUSINESS_SUCCESS:
            const biz: Business[] = action.payload;
            return Object.assign({}, state, {
                mybusinesses: biz.map(buz => buz._id)
            });
        default: {
            return state;
        }
    }
};

export const getFollowers = (state: User) => state.followers;

export const getFollowersIds = (state: User) => state.followers.map(follower => follower._id);

export const getFollowingIds = (state: User) => state.following;

export const getMyBizIds = (state: User) => state.mybusinesses;

export const getMyFollowingBizIds = (state: User) => state.followingBusiness;

export const getSettings = (state: User) => state.settings;

export const getMe = (state: User) => state;

export const getMyId = (state: User) => state._id;

export const getMyImage = (state: User) => state.images;

export const getMyBgImage = (state: User) => state.backgroundImage;

