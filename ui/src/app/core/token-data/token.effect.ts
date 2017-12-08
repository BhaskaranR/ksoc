import { Storage } from '../storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as tokenActions from '../token-data/token.action';
import { AuthActions } from '../auth-data/auth.action';
import { TokenService } from './token.service';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Tokens, LoginModel, LoginSubmitPayload, RegisterModel, RegistrationSubmitPayload } from '../auth-data/auth.model';
import { AccountService } from '../auth-data/auth.service';
import { LoginSuccessAction } from './token.action';
import { WebPushService } from '../../webpush.service';


@Injectable()
export class TokenEffects {

    @Effect()
    loadToken$: Observable<Action> = this.actions$
        .ofType(tokenActions.ActionTypes.LOAD_TOKEN)
        .startWith(new tokenActions.LoadTokenAction())
        .switchMap(() => Observable.from
            (this.storage.getItem('tokens')
                .flatMap((rawTokens: string) => {
                    this.authActions.authReady();
                    if (!rawTokens) {
                        return Observable.throw(new Error(' Not Stored.'));
                    }
                    return of(rawTokens);
                }))
            .flatMap((rawTokens: string) => {
                this.authActions.isLoggedIn();
                return of(new tokenActions.StoreTokenSuccessAction(JSON.parse(rawTokens) as Tokens));
            })
            .catch((ex) => of(new tokenActions.StoreTokenFailureAction(ex)))
        );


    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(tokenActions.ActionTypes.LOGIN)
        .map((action: tokenActions.LoginAction) => action.payload)
        .switchMap((login: LoginSubmitPayload) =>
            this.tokenService.getTokens(login.loginModel)
                .flatMap((res: Response) => {
                    this.authActions.authReady();
                    res.json().requesting_device_id
                    let jwttoken = res.headers.get('authorization');

                    let device = res.headers.get("device_id");
                    let token: Tokens = {
                        access_token: jwttoken,
                        vapidKey: res.json().vapidKey,
                        expires_in: 3650
                    };
                    this.authActions.isLoggedIn();
                    this.storage.setItem('tokens', JSON.stringify(token));
                    return of(new tokenActions.LoginSuccessAction(token));
                })
                .do(() => {
                    this.router.navigate(["/"], { relativeTo: this.activatedRoute })
                })
                .catch((ex) => of(new tokenActions.LoginFailureAction(ex)))
        );

    @Effect()
    webpushSubscription$: Observable<Action> = this.actions$
        .ofType(tokenActions.ActionTypes.LOGIN_SUCCESS)
        .map((action: tokenActions.LoginSuccessAction) => action.payload)
        .switchMap((tokens: Tokens) =>
            Observable.fromPromise(this.webpushService.subscribeToPushNGSW(tokens.vapidKey)).flatMap(() => {
                return of(new tokenActions.WebPushSuccessAction());
            }).catch((ex) => of(new tokenActions.WebPushFailureAction(ex)))
        );

    constructor(private actions$: Actions, private storage: Storage,
        private authActions: AuthActions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService,
        private tokenService: TokenService,
        private webpushService: WebPushService) { }
}
