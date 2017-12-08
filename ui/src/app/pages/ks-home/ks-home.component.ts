import { Component, OnInit, AnimationTransitionEvent, HostListener, ViewChild, NgModule } from '@angular/core';
import { animations } from '../animations';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';

import * as fromRoot from '../../reducers';
import * as appSelector from '../../core/app-data/app.selector';
import * as siteDataActions from '../../core/app-data/app.action';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

import * as postActions from '../../core/post-data/post.action';
import * as appActions from '../../core/app-data/app.action';

@Component({
  selector: 'kshome',
  templateUrl: './ks-home.component.html',
  styleUrls: ['./ks-home.component.scss'],
  animations: animations
})

export class KSHomeComponent  {

  dialogRef: MatDialogRef<LoginComponent>;
  dialogRefSignup: MatDialogRef<RegisterComponent>;
  _activeTabIndex: number;
  location: number;

  private _router: Subscription;

  today: number = Date.now();
  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;


  get activeTabIndex() {
    return this._activeTabIndex;
  }

  set activeTabIndex(val: number) {
    this._activeTabIndex = val;
    this.viewContent(val);
  }



  tabLinks = {
    [0]: 'Home',
    [1]: 'photos',
    [2]: 'video',
    [3]: 'fun',
    [4]: 'learn'
  }

  @ViewChild('sidemenu') sidemenu;

  constructor(private router: Router, protected store: Store<fromRoot.AppState>,
    protected dialog: MatDialog){
  }


  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
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

  viewContent(indx: number) {
    this.location = indx;
    switch (indx) {
      /*case 0:
            this.router.navigateByUrl('/home');
            this.store.dispatch(new postActions.LoadPostPreviewsAction({
              feedtype: 'Home',
              offset: this.offset,
              limit: this.limit
            }));
            break;
      case 1:
            this.router.navigateByUrl('/home/myphotos');
            this.store.dispatch(new postActions.LoadPostPreviewsAction({
              feedtype: 'Home',
              offset: this.offset,
              limit: this.limit
            }));
            break; */
        case 2:
            // this.router.navigateByUrl('/home/myvideos');
            break;
        case 3:
            this.router.navigateByUrl('/home/fun');
            break;
      default:
     /*   this.store.dispatch(new postActions.LoadPostPreviewsAction({
          feedtype: 'Home',
          userid: this.meid,
          offset: this.offset,
          limit: this.limit
        }));
        break;*/
    }
  }


  openLogin() {
    this.dialogRef = this.dialog.open(LoginComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result == 'signup') {
        this.openSignup();
      }
      //  this.lastCloseResult = result;
    });
  }

  openSignup() {
    this.dialogRefSignup = this.dialog.open(RegisterComponent);
    this.dialogRefSignup.afterClosed().subscribe(result => {
      this.dialogRefSignup = null;
      if (result == 'signin') {
        this.openLogin();
      }
    });
  }
}
