import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

@Injectable()
export class AuthActions {
    constructor(private store: Store<AppState>) {}

    isLoggedIn() {
          this.store.dispatch({type: 'IS_LOGGED_IN'});
    }
    isNotLoggedIn() {
        this.store.dispatch({type: 'NOT_LOGGED_IN'});
    }
    authReady() {
        this.store.dispatch({type: 'AUTH_READY'});
    }
}
