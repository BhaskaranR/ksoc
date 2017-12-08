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
  selector: 'sidenav',
  templateUrl: './sidenav.component.html'
})
export class SideNavComponent implements OnInit, OnDestroy {
  @ViewChild('sidemenu') sidemenu;
  currentAlias: string;
  collapseSidebar: boolean;
  isOpen: boolean;

  private meIdSubscription: Subscription;
  me$: Observable<User>;
  meid: string;


  constructor(private _media: ObservableMedia, protected activatedRoute: ActivatedRoute, private _router: Router, private store: Store<fromRoot.AppState>, public menuItems: MenuItems) {
    this._media.subscribe((change: MediaChange) => {
      this.currentAlias = change.mqAlias;
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

  openProfileLink() {
    this._router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
  }


  ngOnInit(): void {
    this.me$ = this.store.select(fromProfile.getMe);
    this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    });
    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');

  }

  ngOnDestroy() {
    this.meIdSubscription.unsubscribe();
  }

}
