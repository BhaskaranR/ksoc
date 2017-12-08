import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Action } from '@ngrx/store';

import * as tokenActions from '../actions/token.actions';
import { AdminToken } from '../models/admin-token.model';
import { TokenService } from '../services/token.service';
import { Storage } from '../../core/storage';

export type Action = tokenActions.All;
@Injectable()
export class TokenEffects {
    constructor(
        private tokenService: TokenService,
        private actions$: Actions,
        private storage: Storage

    ) { }

    @Effect()
    loadAdminToken$: Observable<Action> = this.actions$
    .ofType(tokenActions.TOKEN_GET_REQUESTED)
    .mergeMap(payload => this.tokenService.getAdminToken()
      .map(res => (new tokenActions.LoadAdminTokenCompletedAction(new tokenActions.TokenPayload(res))))
      //console.log('hello'+res.payload.token
      .do((res)=> {this.storage.setItem('token_marketplace', JSON.stringify(res.payload.token))})
    );
}