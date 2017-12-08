import { Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { AppState, isLoggedIn } from '../../reducers';

@Injectable()
export class AuthGuard {
    constructor(private store: Store<AppState>
    ) {}

    isLoggedIn(): Observable<boolean> {
        return this.store.select(isLoggedIn);
    }
}
