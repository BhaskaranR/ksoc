import { Action } from '@ngrx/store';
import { Business, Category, SubCategory, BizCategory, BizNearbyFilter, BusinessWithUsers } from './business.model';
import { type } from '../../core/util';


export const ActionTypes = {
  ADDNEW_SETBIZ: type('[Business] Add New Set Biz'),
  ADDNEW_SETBIZCATEGORY: type('[Business] Add New Set Biz Category'),
  ADDNEW_SETBIZSUBCATEGORY: type('[Business] Add New Set BizSub Category'),
  GET_ALL_CATEGORIES: type('[Business] Get All Categories'),
  GET_ALL_CATEGORIES_SUCCESS: type('[Business] Get All Categories Success'),
  GET_ALL_CATEGORIES_FAILURE: type('[Business] Get All Categories Failure'),
  GET_SUB_CATEGORIES: type('[Business] Get All SubCategories'),
  GET_SUB_CATEGORIES_FROM_STORE: type('[Business] Get All SubCategories From Store'),
  GET_SUB_CATEGORIES_SUCCESS: type('[Business] Get All SubCategories Success'),
  GET_SUB_CATEGORIES_FAILURE: type('[Business] Get All SubCategories Failure'),

  ADD_NEW_BUSINESS: type('[Business] Add a Business'),
  ADD_NEW_BUSINESS_SUCCESS: type('[Business] Add a Business Success'),
  ADD_NEW_BUSINESS_FAILURE: type('[Business] Add a Business Failure'),
  
  GET_ALL_BUSINESS: type('[Business] Get All Business'),
  GET_ALL_BUSINESS_SUCCESS: type('[Business] Get All Business Success'),
  GET_ALL_BUSINESS_FAILURE: type('[Business] Get All Business Failue'),
  GET_ALL_BUSINESS_NEARBY: type('[Business] Get All Businesses Nearby'),
  GET_ALL_BUSINESS_NEARBY_SUCCESS: type('[Business] Get All Businesses Nearby Success'),
  GET_ALL_BUSINESS_NEARBY_FAILURE: type('[Business] Get All Businesses Nearby Failure'),
  
  FOLLOW_BUSINESS: type('[Business] Follow Business'),
  FOLLOW_BUSINESS_SUCCESS : type('[Business] Follow Business Success'),
  FOLLOW_BUSINESS_FAILURE : type('[Business] Follow Business Failure'),
  UNFOLLOW_BUSINESS: type('[Business] Unfollow Business'),
  UNFOLLOW_BUSINESS_SUCCESS: type('[Business] Unfollow Business Success'),
  UNFOLLOW_BUSINESS_FAILURE: type('[Business] Unfollow Business Failure'),

  GET_MYBUSINESS: type('[Business] Get My Businesses'),
  GET_MYBUSINESS_SUCCESS: type('[Business] Get My Businesses Success'),
  GET_MYBUSINESS_FAILURE: type('[Business] Get My Businesses Failure'),
  
  GET_MYBUSINESS_FOLLOWING: type('[Business] Get My Following'),
  GET_MYBUSINESS_FOLLOWING_SUCCESS: type('[Business] Get My Business Following Success'),
  GET_MYBUSINESS_FOLLOWING_FAILURE: type('[Business] Get My Business Following Failure'),
  GET_MYBUSINESS_FOLLOWER: type('[Business] Get My Followers'),
  GET_MYBUSINESS_FOLLOWER_SUCCESS: type('[Business] Get My Business Followers Success'),
  GET_MYBUSINESS_FOLLOWER_FAILURE: type('[Business] Get My Business Followers Failure'),
  GET_BUSINESS_FOLLOWING: type('[Business] Get Business Following'),
  GET_BUSINESS_FOLLOWING_SUCCESS: type('[Business] Get Business Following Success'),
  GET_BUSINESS_FOLLOWING_FAILURE: type('[Business] Get Business Following Failure'),
  GET_BUSINESS_FOLLOWER: type('[Business] Get Business Followers'),
  GET_BUSINESS_FOLLOWER_SUCCESS: type('[Business] Get Business Followers Success'),
  GET_BUSINESS_FOLLOWER_FAILURE: type('[Business] Get Business Followers Failure'),
  GET_SELECT_BUSINESS: type('[Business] Get and Select Business'),
  GET_SELECT_BUSINESS_SUCCESS: type('[Business] Get and Select Business Success'),
  GET_SELECT_BUSINESS_FAILURE: type('[Business] Get and Select Business Failure'),


  ROUTE_TO_BUSINESS_PAGE: type('[Business] Route to Business Page')
};

export class GetAndSelectBusinessAction implements Action {

  type = ActionTypes.GET_SELECT_BUSINESS;

  constructor(public payload: string ){}
}

export class GetAndSelectBusinessSuccessAction implements Action {

  type = ActionTypes.GET_SELECT_BUSINESS_SUCCESS;

  constructor(public payload: BusinessWithUsers[] ){}
}

export class GetAndSelectBusinessFailureAction implements Action {

  type = ActionTypes.GET_SELECT_BUSINESS_FAILURE;

  constructor(public payload: any ){}
}

export class GetAllBusinessNearbyAction implements Action {

  type = ActionTypes.GET_ALL_BUSINESS_NEARBY;

  constructor(public payload: BizNearbyFilter ){}
}

export class GetAllBusinessNearbySuccessAction implements Action {

  type = ActionTypes.GET_ALL_BUSINESS_NEARBY_SUCCESS;

  constructor(public payload: Business[]){}
}

export class GetAllBusinessNearbyFailureAction implements Action {
  type = ActionTypes.GET_ALL_BUSINESS_NEARBY_FAILURE;
  constructor(public payload: any){}
}

export class SubCategoryFoundInStore implements Action {

  type = ActionTypes.GET_SUB_CATEGORIES_FROM_STORE;

  constructor(){}
}

export class AddNewBizAction implements Action {

  type = ActionTypes.ADDNEW_SETBIZ;

  constructor(public payload: string){}
}


export class AddNewBizCategoryAction implements Action {

  type = ActionTypes.ADDNEW_SETBIZCATEGORY;

  constructor(public payload: string){}
}

export class AddNewBizSubCategoryAction implements Action {

  type = ActionTypes.ADDNEW_SETBIZSUBCATEGORY;

  constructor(public payload: string){}
}


export class GetAllCategories implements Action {
  type = ActionTypes.GET_ALL_CATEGORIES;

  constructor() {}
}

export class GetAllCategoriesSuccess implements Action {
  type = ActionTypes.GET_ALL_CATEGORIES_SUCCESS;

  constructor(public payload: BizCategory) {}
}

export class GetAllCategoriesFailure implements Action {
  type = ActionTypes.GET_ALL_CATEGORIES_FAILURE;

  constructor(public payload: any) {}
}


export class GetSubCategories implements Action {
  type = ActionTypes.GET_SUB_CATEGORIES;

  constructor(public payload: string) {}
}

export class GetSubCategoriesSuccess implements Action {
  type = ActionTypes.GET_SUB_CATEGORIES_SUCCESS;

  constructor(public payload: SubCategory[]) {}
}

export class GetSubCategoriesFailure implements Action {
  type = ActionTypes.GET_SUB_CATEGORIES_FAILURE;

  constructor(public payload: any) {}
}

export class AddNewBusinessAction implements Action {
  type = ActionTypes.ADD_NEW_BUSINESS;

  constructor(public payload: Business) {}
}

export class AddNewBusinessActionSuccess implements Action {
  type = ActionTypes.ADD_NEW_BUSINESS_SUCCESS;

  constructor(public payload: Business[]) {}
}

export class RouteToBusinessPageAction implements Action {
  type = ActionTypes.ROUTE_TO_BUSINESS_PAGE;
  
  constructor(public payload: Business){}
}

export class AddNewBusinessActionFailure implements Action {
  type = ActionTypes.ADD_NEW_BUSINESS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAllBusinessAction implements Action {
  type = ActionTypes.GET_ALL_BUSINESS;

  constructor() {}
}

export class GetAllBusinessSuccessAction implements Action {
  type = ActionTypes.GET_ALL_BUSINESS_SUCCESS;

  constructor(public payload: Business[]) {}
}

export class GetAllBusinessFailureAction implements Action {
  type = ActionTypes.GET_ALL_BUSINESS_FAILURE;

  constructor(public payload: any) {}
}

export class FollowBusinessAction implements Action {
  type = ActionTypes.FOLLOW_BUSINESS;

  constructor(public payload: string) {}
}

export class FollowBusinessuccessAction implements Action {
  type = ActionTypes.FOLLOW_BUSINESS_SUCCESS;

  constructor(public payload: Business) {}
}

export class FollowBusinessFailureAction implements Action {
  type = ActionTypes.FOLLOW_BUSINESS_FAILURE;

  constructor(public payload: any) {}
}

export class UnFollowBusinessAction implements Action {
  type = ActionTypes.UNFOLLOW_BUSINESS;

  constructor(public payload: string) {}
}

export class UnFollowBusinessuccessAction implements Action {
  type = ActionTypes.UNFOLLOW_BUSINESS_SUCCESS;

  constructor(public payload: Business) {}
}

export class UnFollowBusinessFailureAction implements Action {
  type = ActionTypes.UNFOLLOW_BUSINESS_FAILURE;
  constructor(public payload: any) {}
}

export class GetMyBusinessAction implements Action {
  type = ActionTypes.GET_MYBUSINESS;
  constructor() { }
}

export class GetMyBusinessSuccessAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_SUCCESS;
  constructor(public payload : Business[]) { }
}

export class GetMyBusinessFailureAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FAILURE;
  constructor(public payload: any) { }
}

export class GetMyBizFollowingAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWING;

  constructor() { }
}

export class GetMyBizFollowingSuccessAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWING_SUCCESS;

  constructor(public payload: Business[]) { }
}

export class GetMyBizFollowingFailureAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWING_FAILURE;

  constructor(payload: any) { }
}

export class GetMyFollowersAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWER;

  constructor(public payload: string) {}
}


export class GetMyFollowersSuccessAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWER_SUCCESS;

  constructor(payload: Business[]) {}
}


export class GetMyFollowersFailureAction implements Action {
  type = ActionTypes.GET_MYBUSINESS_FOLLOWER_FAILURE;

  constructor(public payload: any) {}
}

export class GetBusinessFollowingAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWING;

  constructor(public payload: string) { }
}

export class GetBusinessFollowingSuccessAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWING_SUCCESS;

  constructor(payload: Business[]) { }
}

export class GetBusinessFollowingFailureAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWING_FAILURE;

  constructor(payload: any) { }
}

export class GetBusinessFollowersAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWER;

  constructor(public payload: string) {}
}


export class GetBusinessFollowersSuccessAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWER_SUCCESS;

  constructor(payload: Business[]) {}
}


export class GetBusinessFollowersFailureAction implements Action {
  type = ActionTypes.GET_BUSINESS_FOLLOWER_FAILURE;

  constructor(public payload: any) {}
}

export type Actions
  = GetAllCategories
    | GetAllCategoriesSuccess
    | GetAllCategoriesFailure
    | GetSubCategories
    | GetSubCategoriesSuccess
    | GetSubCategoriesFailure
    | GetAllBusinessAction
    | GetAllBusinessSuccessAction
    | GetAllBusinessFailureAction
    | GetBusinessFollowingAction
    | GetBusinessFollowingSuccessAction
    | GetBusinessFollowingFailureAction
    | FollowBusinessAction
    | FollowBusinessuccessAction
    | FollowBusinessFailureAction
    | UnFollowBusinessAction
    | UnFollowBusinessuccessAction
    | UnFollowBusinessFailureAction
    | GetBusinessFollowersAction
    | GetBusinessFollowersSuccessAction
    | GetBusinessFollowersFailureAction
    | GetMyBizFollowingAction
    | GetMyBizFollowingSuccessAction
    | GetMyBizFollowingFailureAction
    | GetMyFollowersAction
    | GetMyFollowersSuccessAction
    | GetMyFollowersFailureAction
    | AddNewBusinessAction
    | AddNewBusinessActionSuccess
    | AddNewBusinessActionFailure
    | AddNewBizAction
    | AddNewBizCategoryAction
    | AddNewBizSubCategoryAction
    | SubCategoryFoundInStore
    | GetAllBusinessNearbyAction
    | GetAllBusinessNearbySuccessAction
    | GetAllBusinessNearbyFailureAction
    | GetAndSelectBusinessAction
    | GetAndSelectBusinessSuccessAction
    | GetAndSelectBusinessFailureAction
    | RouteToBusinessPageAction;
