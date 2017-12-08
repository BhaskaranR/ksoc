import * as fromRouter from '@ngrx/router-store';

import * as fromPosts from '../core/post-data/posts.reducer';
import * as fromUser from '../core/user-data/user.reducer';
import * as fromBusiness from '../business-core/business-data';
import * as fromNewComment from '../core/post-data/mycomment.reducer';
import * as fromNewFavor from '../core/post-data/myfavored.reducer';
import * as fromImageUpload from '../pages/new-post/imageupload-data/imageupload.model';

import * as fromProfile from '../core/profile-data/profile.reducer';
import * as fromApp from '../core/app-data/app.reducer';

import { Posts, postComment, favor } from '../core/post-data/post-model';
import { AppData } from '../core/app-data/app.model';
import { User } from '../core/user-data/user-model';
import { FiltersState } from '../pages/photo-filter/filter-data/interfaces';
import { Tokens } from '../core/auth-data/auth.model';
import { loggedInReducer, authReadyReducer } from '../core/auth-data/auth.reducer';
import { tokensReducer } from '../core/token-data/token.reducer';

import { Products } from '../pages/commerce-home/core/models/products.model';
import { AdminToken } from '../pages/commerce-home/core/models/admin-token.model';

import { productsReducer } from '../pages/commerce-home/core/reducers/products.reducer';
import { tokenReducer } from '../pages/commerce-home/core/reducers/token.reducer';

export interface AppState {
  loading: boolean;
  appStarting: boolean;
  tokens: Tokens;
  loggedIn: boolean;
  authReady: boolean;
  posts: Posts;
  users: fromUser.State;
  profile: User;
  tempImages: fromImageUpload.State;
  newComment: postComment;
  newFavoured: favor;
  filters: FiltersState;
  appData: AppData;
  business: fromBusiness.BusinessState;
  products: Products;
  marketplace: AdminToken;
}


export const reducers = {
  tokens: tokensReducer,
  loggedIn: loggedInReducer,
  authReady: authReadyReducer,
  users: fromUser.userReducer,
  profile: fromProfile.profileReducer,
  router: fromRouter.routerReducer,
  posts: fromPosts.reducer,
  appData: fromApp.reducer,
  newComment: fromNewComment.reducer,
  favor: fromNewFavor.reducer,
  products: productsReducer,
  marketplace: tokenReducer
};


export const getMyProfile = (state: AppState) => {
  return state.profile;
};

export const getUserState = (state: AppState) => {
  return state.users;
};

export const isLoggedIn = (state: AppState) => {
  return state.loggedIn;
};

export const IsMyProfileSet = (state: AppState) => {
  return state.profile.profileSet;
};

export const getPostsState = (state: AppState) => {
  return state.posts;
};

export const getNewPostCommentState = (state: AppState) => state.newComment;
export const getNewFavorPostState = (state: AppState) => state.newFavoured;


export const getBusinessState = (state: AppState) => {
  return state.business.businesses;
};

export const getCategoryState = (state: AppState) => {
  return state.business.category;
};

export const getSubCategoryState = (state: AppState) => {
  return state.business.subcategory;
};

export const getAddBizState = (state: AppState) => {
  return state.business.addbiz;
};


export const getAdminToken = (state: AppState) => {
  return state.marketplace.token;
}

export const getProductsState = (state: AppState) => {
  return state.products;
}