import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NewPostComponent } from '../new-post/newpost/newpost';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements  OnDestroy {
  dialogRef: MatDialogRef<NewPostComponent>;
  dialogRefOne: MatDialogRef<InviteFriendsComponent>;

  currentMedia: string;
  private subscriptions: Subscription[] = [];
  currentAlias: string;
  currentUrl: string;

  tabLinks = [
    { label: 'Featured', link: 'featured' },
    { label: 'Photos', link: 'photos' },
    { label: 'Videos', link: 'videos' },
    { label: 'Fun', link: 'fun' },
    { label: 'Learn', link: 'learn' },
  ];

  constructor(private _media: ObservableMedia,
    protected store: Store<fromRoot.AppState>,
    protected dialog: MatDialog,
    private router: Router) {
    
    this.currentUrl = router.url;

    this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
      this.currentAlias = change.mqAlias;
    }));


    router.events.subscribe((event) => {
      console.log(event);
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
      }
    });
  }

  onScroll () {
    console.log('scrolled!!')
}

  isOver(): boolean {
    return (this.currentAlias == "sm" || this.currentAlias == "xs")
  }


  get showSideBlocks() {
   return this.currentAlias !== "xs" && this.currentAlias !== "sm" && this.currentUrl && (this.currentUrl.includes('featured') || this.currentUrl.endsWith('/home') || this.currentUrl == "/" );
  }


  openNewPostDialog() {
    this.dialogRef = this.dialog.open(NewPostComponent, {
      disableClose: false,
      panelClass: 'custom-overlay-pane-class',
      hasBackdrop: true
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  openInviteFriendsDialog() {
    this.dialogRefOne = this.dialog.open(InviteFriendsComponent, {
      disableClose: false,
      panelClass: 'invite-friends',
      hasBackdrop: true
    });
    this.dialogRefOne.afterClosed().subscribe(result => {
      this.dialogRefOne = null;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subsc => subsc.unsubscribe());
  }
}

