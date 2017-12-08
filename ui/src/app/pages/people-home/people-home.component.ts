import { Component, ViewChild, HostBinding, AnimationTransitionEvent, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { animations } from '../animations';
import { Store } from '@ngrx/store';

import * as siteDataActions from '../../core/app-data/app.action';

import * as fromRoot from '../../reducers';
import * as appActions from '../../core/app-data/app.action';
import * as appSelector from '../../core/app-data/app.selector';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { User, UserAction } from '../../core/user-data/user-model';
import * as profileActions from '../../core/profile-data/profile.action';
import * as userActions from '../../core/user-data/user.action';
import * as userSelector from '../../core/user-data/user.selector';

import * as fromProfile from '../../core/profile-data/profile.selector';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from '../../core/app-data/app.selector';

import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  templateUrl: './people-home.component.html',
  styleUrls: ['./people-home.component.scss'],
  animations: animations
})

export class PeopleComponent implements OnInit, OnDestroy {
  private _subscription;

  subscriptions: Subscription[] = [];

  activeTransitionAnimation: boolean;
  fireTransition: string;

  private user$: Observable<User>;
  private meIdSubscription: Subscription;
  meid: string;
  isOpen: boolean;
  getIfUserSuccess: Subscription;

  _activeLinkIndex = 2;


  get activeLinkIndex() {
    return this._activeLinkIndex;
  }
  set activeLinkIndex(val: number) {
    this._activeLinkIndex = val;
    this.getData();
  }


  people$: Observable<UserAction[]>;
  currentMedia: string;
  tabLinks = [
    { label: 'Suggestions', link: 'suggestions' },
    { label: 'Followers', link: 'followers' },
    { label: 'Following', link: 'following' }
  ];

  constructor(protected store: Store<fromRoot.AppState>,
    private _media: ObservableMedia,
    private router: Router, private activatedRoute: ActivatedRoute) {

    store.select(fromApp.getSideNavState).subscribe(isSideNavOpen => {
      this.isOpen = isSideNavOpen;
    });
    this.user$ = store.select(fromProfile.getMe);
    this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    });
  }

  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  ngOnInit() {
    this._media.subscribe((change: MediaChange) => {
      this.currentMedia = change.mqAlias;
    });
    this.getData();
  }

  //TODO change this in the selector
  private getData() {
    if (this.activeLinkIndex === 0) {
      this.store.dispatch(new userActions.GetAllUsersAction());
      this.people$ = this.store.select(userSelector.getSuggestedUsers);
    } else if (this.activeLinkIndex === 1) {
      this.store.dispatch(new profileActions.GetMyFollowersAction());
      this.people$ = this.store.select(userSelector.getMyFollowersWithAction);
    } else if (this.activeLinkIndex === 2) {
      this.store.dispatch(new profileActions.GetMyFollowingAction());
      this.people$ = this.store.select(userSelector.getMyFollowingWithAction);
    }
  }

  animationDone($event: AnimationTransitionEvent) {
    if ($event.fromState !== 'void') {
      if ($event.toState === 'in') {
        this.store.dispatch(new siteDataActions.SetTransitionAction(false));
      }
      else if ($event.toState === 'out') {
        this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
      }
    }
  }


  openProfileLink() {
    this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
  }

  tabChanged(indx: number) {
    this.activeLinkIndex = indx;
    this.getData();
  }

  peopleFollowAction($event: { id: string, action: string }) {
    if ($event.action === 'Follow') {
      this.store.dispatch(new userActions.FollowUserAction($event.id));
    } else {
      this.store.dispatch(new userActions.UnFollowUserAction($event.id));
    }
  }

  ngOnDestroy() {
    //this.meIdSubscription.unsubscribe();
  }
}
