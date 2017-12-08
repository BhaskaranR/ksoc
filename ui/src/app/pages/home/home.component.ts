import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from '../../core/user-data/user-model';
import { Store } from '@ngrx/store';
import * as appActions from '../../core/app-data/app.action';
import * as fromRoot from '../../reducers';
import * as fromProfile from '../../core/profile-data/profile.selector';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { RecordRTCComponent } from '../record-rtc/record-rtc.component';
import * as fromApp from '../../core/app-data/app.selector';
import { animation, animateChild, trigger, group, transition, animate, style, query } from '@angular/animations';
import { AccountService } from '../../core/auth-data/auth.service';
import { AuthActions } from '../../core/auth-data/auth.action';
import { TokenService } from '../../core/token-data/token.service';
import { WebPushService } from '../../webpush.service';


@Component({
  selector: 'app-layout',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  videoDialogRef: MatDialogRef<RecordRTCComponent>;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  loading: boolean = false;
  private _router: Subscription;

  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  isOpen: boolean;


  fixed = false;
  coverHeader = false;
  showHeader = false;
  showFooter = false;
  get fixedTop() { return this.fixed && this.showHeader && !this.coverHeader ? 64 : 0; }
  get fixedBottom() { return this.fixed && this.showFooter && !this.coverHeader ? 64 : 0; }
  
  @ViewChild('sidemenu') sidemenu;


  private meIdSubscription: Subscription;
  me$: Observable<User>;
  meid: string;
  currentAlias: string;
  setinitial: boolean;

  constructor(private _media: ObservableMedia,
    private tokens: TokenService,
    private authActions: AuthActions,
    protected activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.AppState>,
    private webpush: WebPushService,
    private router: Router,
    private authService: AccountService) {
    this._media.subscribe((change: MediaChange) => {
      this.currentAlias = change.mqAlias;

      if (!this.isOver() && !this.setinitial) {
        this.togglesidenav();
        this.setinitial = true;
      }
    });
  }


  prepRouteState(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    return data ? data['animation'] : '';
  }


  onRouterAnimationDone() {
    this.loading = false;
  }


  ngOnInit(): void {
    this.me$ = this.store.select(fromProfile.getMe);
    this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    });
    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');

    this.store.select(fromApp.getSideNavState).subscribe(isSideNavOpen => {
      this.isOpen = isSideNavOpen;
    });
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

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }
  }


  private navstart;
  ngAfterViewInit() {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd || event instanceof NavigationStart).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.navstart = event.url;
        return;
      }
      if (!this.navstart) return;
      this.url = event.url;
      if (this.isOver()) {
        this.togglesidenav();
      }
    });
  }

  onScroll () {
    console.log('scrolled!!')
}

  showtitle() {
    return !(this.isOver() && !this.isOpen);
  }

  /*showOdometer() {
    if (!this.isOver()) return true;
    return !(this.isOpen);
  }
*/

  ngOnDestroy() {
    this.meIdSubscription.unsubscribe();
    this._router.unsubscribe();
  }

  isOver(): boolean {
    return (this.currentAlias == "sm" || this.currentAlias == "xs")
  }

  togglesidenav() {
    this.store.dispatch(new appActions.ToggleSideNavAction());
  }

  logout() {
    //logout
    this.webpush.unsubscribeFromPush().then((result) => {
      this.redirect()
    }).catch((ex) =>{
      this.redirect();
    });
  }
  private redirect() {
    this.authService.logout().then((res) => {
      this.tokens.deleteTokens();
      this.authActions.isNotLoggedIn();
      this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
    });
  }
}