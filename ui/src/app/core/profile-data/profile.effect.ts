import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Database } from '@ngrx/db';
import { UserService } from '../user-data/user.service';
import * as profileActions from './profile.action';
import { User } from '../user-data/user-model';
import * as userSelector from '../user-data/user.selector';

import { defer } from 'rxjs/observable/defer';
import * as fromRoot from '../../reducers';

@Injectable()
export class ProfileEffects {

    @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() => {
        return this.db.open('ks-app');
    });

    @Effect()
    forgotPassword$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.FORGOT_PASSWORD)
        .map((action: profileActions.ForgotUserPassword) => action.payload)
        .switchMap((userId: string) => this.userService.forgotpassword(userId)
            .map((user: User) => new profileActions.ForgotUserPasswordSuccess())
            .catch((ex) => of(new profileActions.ForgotUserPasswordFailure(ex)))
        );

    @Effect()
    changePassword$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.CHANGE_PASSWORD)
        .map((action: profileActions.ChangeUserPassword) => action.payload)
        .switchMap((pwd) => this.userService.changepassword(pwd)
            .map((user: User) => new profileActions.ChangeUserPasswordSuccess())
            .catch((ex) => of(new profileActions.ChangeUserPasswordFailure(ex)))
        );

    @Effect()
    updateSettings$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_SETTINGS)
        .map((action: profileActions.UpdateSettings) => action.payload)
        .switchMap((settings: any) => this.userService.updatesettings(settings)
            .map(() => new profileActions.UpdateSettingsSuccess(settings))
            .catch((ex) => of(new profileActions.UpdateSettingsFailure(ex)))
        );
    @Effect()
    updateUserEducationHistory$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_EDUCATION_HISTORY)
        .map((action: profileActions.UpdateUserEducationHistory) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserEducationHistory(settings)
            .map(() => new profileActions.UpdateUserEducationHistorySuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserEducationHistoryFailure(ex)))
        );
    @Effect()
    updateUserPersonalInfo$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_PERSONAL_INFO)
        .map((action: profileActions.UpdateUserPersonalInfo) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserPersonalInfo(settings)
            .map(() => new profileActions.UpdateUserPersonalInfoSuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserPersonalInfoFailure(ex)))
        );
    @Effect()
    updateUserWorkHistory$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_WORK_HISTORY)
        .map((action: profileActions.UpdateUserWorkHistory) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserWorkHistory(settings)
            .map(() => new profileActions.UpdateUserWorkHistorySuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserWorkHistoryFailure(ex)))
        );
    @Effect()
    updateUserSiteUrls$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_CUSTOM_URLS)
        .map((action: profileActions.UpdateUserCustomUrls) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserCustomUrls(settings)
            .map(() => new profileActions.UpdateUserCustomUrlsSuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserCustomUrlsFailure(ex)))
        );
    @Effect()
    updateUserPersonalContact$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_PERSONAL_CONTACT)
        .map((action: profileActions.UpdateUserPersonalContact) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserPersonalContact(settings)
            .map(() => new profileActions.UpdateUserPersonalContactSuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserPersonalContactFailure(ex)))
        );
    @Effect()
    updateUserPlacesHistory$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.UPDATE_USER_PLACES_HISTORY)
        .map((action: profileActions.UpdateUserPlacesHistory) => action.payload)
        .switchMap((settings: any) => this.userService.updateUserPlacesHistory(settings)
            .map(() => new profileActions.UpdateUserPlacesHistorySuccess(settings))
            .catch((ex) => of(new profileActions.UpdateUserPlacesHistoryFailure(ex)))
        );
    @Effect()
    profileRequest$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.GET_PROFILE_REQUEST)
        .map((action: profileActions.GetProfileRequestAction) => action.payload)
        .switchMap((userId: string) => this.userService.getUser(userId)
            .map((ud) => new profileActions.StoreProfileSuccessAction(ud))
            .catch((ex) => of(new profileActions.StoreProfileFailureAction(ex)))
        );

    @Effect()
    getMyFollowers$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.GET_MY_FOLLOWERS)
        .switchMap(() => this.userService.getMyFollowers()
            .map((ud) => new profileActions.GetMyFollowersSuccessAction(ud))
            .catch((ex) => of(new profileActions.StoreProfileFailureAction(ex)))
        );




    @Effect()
    getMyFollowing$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.GET_MY_FOLLOWING)
        .switchMap(() => {
            /*return 
            this.hasFollowingInStore()
                .switchMap(inStore => {
                    if (inStore) {
                        return of(new profileActions.GetMyFollowingFromStoreAction())
                    } */
                    return this.userService.getMyFollowing()
                        .map((ud) => new profileActions.GetMyFollowingSuccessAction(ud))
                        .catch((ex) => of(new profileActions.GetMyFollowingFailureAction(ex)))
                //});
        });


    hasFollowingInStore(): Observable<boolean> {
        return this.store.select(userSelector.getMyFollowing)
            .map(entities => {
                return !!entities;
            })
            .take(1);
    }


    @Effect()
    storeProfile$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.STORE_PROFILE)
        .map((action: profileActions.StoreProfileAction) => action.payload)
        .map((user) => new profileActions.StoreProfileSuccessAction(user))
        .catch((ex) => of(new profileActions.StoreProfileFailureAction(ex)));


    @Effect()
    updateProfile$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.PROFILE_UPDATE_REQUEST)
        .map((action: profileActions.UpdateProfileRequestAction) => action.payload)
        .switchMap((user: User) => this.userService.updateUser(user)
            .map((ud) => new profileActions.UpdateProfileSuccessAction(ud))
            .catch((ex) => of(new profileActions.UpdateProfileFailureAction(ex)))
        );

    @Effect()
    removeProfile$: Observable<Action> = this.actions$
        .ofType(profileActions.ActionTypes.REMOVE_PROFILE)
        .map((action: profileActions.RemoveProfileAction) => action.payload)
        .mergeMap(user =>
            this.db.deleteDatabase('ks-app')
                .map(() => new profileActions.RemoveProfileSuccessAction(user))
                .catch((ex) => of(new profileActions.RemoveProfileFailureAction(ex)))
        );

    constructor(private actions$: Actions,
        private userService: UserService,
        private db: Database,
        private store: Store<fromRoot.AppState>) { }

}
