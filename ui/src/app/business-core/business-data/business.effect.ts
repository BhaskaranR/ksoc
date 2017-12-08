import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BusinessService } from './business.service';
import * as businessActions from './business.action';
import { Business, Category, SubCategory, BizCategory, BusinessWithUsers } from './business.model';

import * as fromRoot from '../../reducers';
import * as fromBusiness from './business.selector';

import { GetSubCategoriesSuccess, GetSubCategoriesFailure, GetAllBusinessNearbyFailureAction } from './business.action';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class BusinessEffects {

    @Effect()
    getAllCategories$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_ALL_CATEGORIES)
        .switchMap(() => this.businessService.getAllCategories()
            .map((cats: BizCategory) => new businessActions.GetAllCategoriesSuccess(cats))
            .catch((ex) => of(new businessActions.GetAllCategoriesFailure(ex)))
        );

    @Effect()
    addNewBizCategory$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.ADDNEW_SETBIZCATEGORY)
        .map((action: businessActions.AddNewBizCategoryAction) => action.payload)
        .switchMap((payload) => of(new businessActions.GetSubCategories(payload)));

    @Effect()
    getSubCategories$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_SUB_CATEGORIES)
        .map((action: businessActions.GetSubCategories) => action.payload)
        .switchMap((payload) => {
            return this.hasSubCategoryInStore(payload)
                .switchMap(inStore => {
                    if (inStore) {
                        return of(new businessActions.SubCategoryFoundInStore())
                    }
                    return this.businessService.getSubCategories(payload)
                        .map((cats: SubCategory[]) => new businessActions.GetSubCategoriesSuccess(cats))
                        .catch((ex) => of(new businessActions.GetSubCategoriesFailure(ex)));
                });
        });

    hasSubCategoryInStore(id: string): Observable<boolean> {
        return this.store.select(fromBusiness.getSubCatsForSelectedAddCat)
            .map(entities => {
                return !!entities;
            })
            .take(1);
    }

    @Effect()
    addNewBusines$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.ADD_NEW_BUSINESS)
        .map((action: businessActions.AddNewBusinessAction) => action.payload)
        .switchMap((biz) => this.businessService.addNewBusiness(biz)
            .map((biz: Business) =>{
                return new businessActions.AddNewBusinessActionSuccess([biz])
            })
            .catch((ex) => of(new businessActions.GetAllBusinessFailureAction(ex)))
        );

    @Effect({ dispatch: false })
    addNewBusinessSuccess$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.ADD_NEW_BUSINESS_SUCCESS)
        .map((action: businessActions.AddNewBusinessActionSuccess) => action.payload)
        .switchMap((payload) => {
             this.router.navigate(['/biz', payload[0]._id])
            return of(new businessActions.RouteToBusinessPageAction(payload[0]))
        })
        
    @Effect()
    getSelectedBusiness$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_SELECT_BUSINESS)
        .map((action: businessActions.GetAndSelectBusinessAction) => action.payload)
        .switchMap((payload) => this.businessService.getBusiness(payload)
            .map((biz: BusinessWithUsers) => new businessActions.GetAndSelectBusinessSuccessAction([biz]))
            .catch((ex) => of(new businessActions.GetAndSelectBusinessFailureAction(ex)))
        );

    @Effect()
    getAllBusines$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_ALL_BUSINESS)
        .switchMap(() => this.businessService.getAllBusiness()
            .map((users: Business[]) => new businessActions.GetAllBusinessSuccessAction(users))
            .catch((ex) => of(new businessActions.GetAllBusinessFailureAction(ex)))
        );

    @Effect()
    getMyFollowingBusines$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_MYBUSINESS_FOLLOWING)
        .switchMap(() => this.businessService.getMyBusinessFollowing()
            .map((bizs: Business[]) => new businessActions.GetMyBizFollowingSuccessAction(bizs))
            .catch((ex) => of(new businessActions.GetMyBizFollowingFailureAction(ex)))
        );

    @Effect()
    getAllBusinessNearby$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_ALL_BUSINESS_NEARBY)
        .map((action: businessActions.GetAllBusinessNearbyAction) => action.payload)
        .switchMap((payload) => this.businessService.getBusinessNearby(payload)
            .map((biz: Business[]) => new businessActions.GetAllBusinessNearbySuccessAction(biz))
            .catch((ex) => of(new businessActions.GetAllBusinessNearbyFailureAction(ex)))
        );


    @Effect()
    followBusiness$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.FOLLOW_BUSINESS)
        .map((action: businessActions.FollowBusinessAction) => action.payload)
        .switchMap((userId: string) => this.businessService.followBiz(userId)
            .map((user: Business) => new businessActions.FollowBusinessuccessAction(user))
            .catch((ex) => of(new businessActions.FollowBusinessFailureAction(ex)))
        );

    @Effect()
    unfollowBusiness$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.UNFOLLOW_BUSINESS)
        .map((action: businessActions.UnFollowBusinessAction) => action.payload)
        .switchMap((businessId: string) => this.businessService.unfollowBiz(businessId)
            .map((bus: Business) => new businessActions.UnFollowBusinessuccessAction(bus))
            .catch((ex) => of(new businessActions.UnFollowBusinessFailureAction(ex)))
        );

    @Effect()
    getMyBusiness: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_MYBUSINESS)
        .switchMap(() => this.businessService.getMyBusiness()
            .map((bizs: Business[]) => new businessActions.GetMyBusinessSuccessAction(bizs))
            .catch((ex) => of(new businessActions.GetMyBusinessFailureAction(ex)))
        );

    @Effect()
    getMyBusinessFollowing$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_BUSINESS_FOLLOWING)
        .switchMap(() => this.businessService.getMyBusinessFollowing()
            .map((busi: Business[]) => new businessActions.GetMyBizFollowingSuccessAction(busi))
            .catch((ex) => of(new businessActions.GetMyBizFollowingFailureAction(ex)))
        );

    @Effect()
    getBusinessFollowers$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_BUSINESS_FOLLOWER)
        .map((action: businessActions.GetMyFollowersAction) => action.payload)
        .switchMap((busId) => this.businessService.getFollowersOfBusiness(busId)
            .map((businesses: Business[]) => new businessActions.GetBusinessFollowersSuccessAction(businesses))
            .catch((ex) => of(new businessActions.GetBusinessFollowersFailureAction(ex)))
        );

    @Effect()
    getBusinessFollowing$: Observable<Action> = this.actions$
        .ofType(businessActions.ActionTypes.GET_BUSINESS_FOLLOWING)
        .map((action: businessActions.GetBusinessFollowingAction) => action.payload)
        .switchMap((userId) => this.businessService.getFollowingOfBusiness(userId)
            .map((busi: Business[]) => new businessActions.GetMyBizFollowingSuccessAction(busi))
            .catch((ex) => of(new businessActions.GetMyBizFollowingFailureAction(ex)))
        );

    constructor(private actions$: Actions,
        private businessService: BusinessService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>) { }
}
