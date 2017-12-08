import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UserService } from './user.service';
import * as userActions from './user.action';
import * as fromUser from './user.selector';
import { User } from './user-model';

import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserEffects {

    @Effect()
    getAllUsers$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_ALL_USERS)
        .switchMap(() => {
            //discuss on this..
           /* return this.fetchedAllUsers()
                .switchMap(inStore => {
                    if (inStore) {
                        return of(new userActions.GetAllUsersFromStoreAction())
                    } */
                    return this.userService.getAllUsers()
                        .map((users: User[]) => new userActions.GetAllUsersSuccessAction(users))
                        .catch((ex) => of(new userActions.GetAllUsersFailureAction(ex)))
               // });
        });

    fetchedAllUsers(): Observable<boolean> {
        return this.store.select(fromUser.getUsersSuccess)
            .map(entities => {
                return !!entities;
            })
            .take(1);
    }


    @Effect()
    getUsers$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_AND_SELECT_USER)
        .map((action: userActions.GetAndSelectUserAction) => action.payload)
        .switchMap((payload) => this.userService.getUser(payload)
            .map((users: User) => new userActions.GetAndSelectUserSuccesAction(users))
            .catch((ex) => of(new userActions.GetAndSelectUserFailureAction(ex)))
        );

    @Effect()
    followUser$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.FOLLOW_USER)
        .map((action: userActions.FollowUserAction) => action.payload)
        .switchMap((userId: string) => this.userService.followUser(userId)
            .map((user: User) => new userActions.FollowUserSuccessAction(user))
            .catch((ex) => of(new userActions.FollowUserFailureAction(ex)))
        );

    @Effect()
    unfollowUser$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.UNFOLLOW_USER)
        .map((action: userActions.UnFollowUserAction) => action.payload)
        .switchMap((userId: string) => this.userService.unFollowUser(userId)
            .map((user: User) => new userActions.UnFollowUserSuccessAction(user))
            .catch((ex) => of(new userActions.UnFollowUserFailureAction(ex)))
        );

    @Effect()
    getMyFollowers$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_MY_FOLLOWER)
        .map((action: userActions.GetMyFollowersAction) => action.payload)
        .switchMap(() => this.userService.getMyFollowers()
            .map((users: User[]) => new userActions.GetMyFollowersSuccessAction(users))
            .catch((ex) => of(new userActions.GetMyFollowersFailureAction(ex)))
        );

    @Effect()
    getMyFollowing$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_MY_FOLLOWING)
        .map((action: userActions.GetMyFollowingAction) => action.payload)
        .switchMap(() => this.userService.getMyFollowing()
            .map((users: User[]) => new userActions.GetMyFollowingSuccessAction(users))
            .catch((ex) => of(new userActions.GetMyFollowingFailureAction(ex)))
        );


    @Effect()
    getUserFollowers$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_USER_FOLLOWER)
        .map((action: userActions.GetMyFollowersAction) => action.payload)
        .switchMap((userId) => this.userService.getFollowersOfUser(userId)
            .map((users: User[]) => new userActions.GetUserFollowersSuccessAction(users))
            .catch((ex) => of(new userActions.GetUserFollowersFailureAction(ex)))
        );

    @Effect()
    getUserFollowing$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.GET_USER_FOLLOWING)
        .map((action: userActions.GetUserFollowingAction) => action.payload)
        .switchMap((userId) => this.userService.getFollowingOfUser(userId)
            .map((users: User[]) => new userActions.GetMyFollowingSuccessAction(users))
            .catch((ex) => of(new userActions.GetMyFollowingFailureAction(ex)))
        );

    constructor(private actions$: Actions,
        private userService: UserService,
        private store: Store<fromRoot.AppState>) { }

}
