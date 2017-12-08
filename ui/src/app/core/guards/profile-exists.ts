import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../reducers';
import * as profileAction from '../profile-data/profile.action';
import {UserService} from '../user-data/user.service';
import { User } from '../user-data/user-model';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class ProfileExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.AppState>,
    private userService: UserService,
    private router: Router
  ) { }


  /**
   * This method checks if a profile with the given ID is already registered
   * in the Store
   */
  hasProfileInStore(): Observable<boolean> {
    return this.store.select(fromRoot.IsMyProfileSet)
      .first()
      .take(1);
  }


  /**
   * This method loads a profile with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasProfileInApi(): Observable<boolean> {
    return this.userService.getMyProfile()
      .map((user: User) => {
        return  new profileAction.StoreProfileSuccessAction(user);
      })
      .do((action: profileAction.StoreProfileSuccessAction) => this.store.dispatch(action))
      .map(user => {
        return !!user;
      })
      .catch(() => {
        this.router.navigate(['/error']);
        new profileAction.StoreProfileFailureAction('Cannot retrieve profile');
        return of(false);
      });
  }

  /**
   * `hasProfile` composes `hasProfileInStore` and `hasProfileInApi`. It first checks
   * if the profile is in store, and if not it then checks if it is in the
   * API.
   */
  hasProfile(): Observable<boolean> {
    return this.hasProfileInStore()
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasProfileInApi();
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasProfileInStore()
      .switchMap(() => this.hasProfile().first());
  }
}
