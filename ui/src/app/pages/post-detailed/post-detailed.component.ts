import { PostService } from '../../core/post-data/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, NgZone, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as fromProfile from '../../core/profile-data/profile.selector';
import * as fromPosts from '../../core/post-data/post.selector';
import { PhotoDetails } from '../../core/services/photodetails';

import { User } from '../../core/user-data/user-model';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../../core/post-data/post-model';
import * as postActions from '../../core/post-data/post.action';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import * as fromApp from '../../core/app-data/app.selector';
import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css']
})
export class PostDetailedComponent implements OnInit, OnDestroy {
  prev: any;
  data: any;
  items$: any;
  postId: any;
  private offset: number = 0;
  private limit: number = 5;
  currentMedia: string;
  protected me$: Observable<User>;
  private subscriptions: Subscription[] = [];
  protected meid: string;
  photos$: Observable<Post>;
  loading$: Observable<boolean>;
  currentAlias: string;

  constructor(protected store: Store<fromRoot.AppState>,
    private _media: ObservableMedia,
    private _ngZone: NgZone,
    protected activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private postservice: PostService,
    private location: Location,
  ) {

    this.subscriptions.push(store.select(fromApp.getPrevRoute).subscribe(prev => {
      this.prev = prev;
    }));
  }
  goback() {
    this.location.back();
  }
  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      params => {
        this.postId = params['id'];
        this.store.dispatch(new postActions.SelectPostAction(this.postId));
        this.postservice.getPostbyId(this.postId)
          .subscribe(post => {
            this.data = post
          }
          )
      }
    ));
    this.me$ = this.store.select(fromProfile.getMe);
    this.items$ = this.store.select(fromPosts.getSelectedPostWithAllImages);
    this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
      this.currentAlias = change.mqAlias;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  isOver(): boolean {
    return (this.currentAlias == "sm" || this.currentAlias == "xs")
  }
}
