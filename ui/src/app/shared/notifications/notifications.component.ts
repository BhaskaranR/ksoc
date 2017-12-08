import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromProfile from '../../core/profile-data/profile.selector';

import * as fromApp from '../../core/app-data/app.selector';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MenuItems } from '../menu-items/menu-items';
import { User } from '../../core/user-data/user-model';


@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent  implements OnInit, OnDestroy  {
  @ViewChild('sidemenu') sidemenu;
  currentAlias: string;
  collapseSidebar: boolean;
  isOpen: boolean;

  private meIdSubscription: Subscription;
  me$: Observable<User>;
  meid: string;
  today: number = Date.now();


  constructor(  private _media: ObservableMedia,  protected activatedRoute: ActivatedRoute, private _router: Router, private store: Store<fromRoot.AppState>, public menuItems: MenuItems) {
    this._media.subscribe((change: MediaChange) => {
      this.currentAlias = change.mqAlias;
    });
    store.select(fromApp.getSideNavState).subscribe(isSideNavOpen =>{
             this.isOpen = isSideNavOpen;
            });
        
  }

  isOver(): boolean {
    return (this.currentAlias == "sm" || this.currentAlias == "xs")
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if ((this.currentAlias == "xs" || this.currentAlias == "sm")  && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if ((this.currentAlias == "xs" || this.currentAlias == "sm")  && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }

  ngOnInit(): void {
    this.me$ = this.store.select(fromProfile.getMe);
    this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    });
  }

    ngOnDestroy() {
    this.meIdSubscription.unsubscribe();
  }

}
