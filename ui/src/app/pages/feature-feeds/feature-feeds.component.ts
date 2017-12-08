import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../core/user-data/user-model';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../../core/post-data/post-model';
import { Router } from '@angular/router';
import * as postActions from '../../core/post-data/post.action';
import * as fromPosts from '../../core/post-data/post.selector';
import * as fromRoot from '../../reducers';
import * as appActions from '../../core/app-data/app.action';
import { getMeId } from '../../core/profile-data/profile.selector';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PostDetailPopupComponent } from '../post-detailed/post-detail-popup.component';

@Component({
  selector: 'app-feature-feeds',
  templateUrl: './feature-feeds.component.html',
  styleUrls: ['./feature-feeds.component.scss']
})
export class FeatureFeedsComponent implements OnInit, OnDestroy {
  num = 1;
  items$: Observable<Post[]>;
  loading$: Observable<boolean>;
  allPostsLoaded$: Observable<boolean>;
  private subscriptions: Subscription[] = [];
  private offset: number = 0;
  private limit: number = 10;
  protected meid: string;
  private postDialogRef: MatDialogRef<PostDetailPopupComponent>;
  
  constructor(protected store: Store<fromRoot.AppState>,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.items$ = this.store.select(fromPosts.getAllPosts);
    this.loading$ = this.store.select(fromPosts.getPostsLoading);
    this.allPostsLoaded$ = this.store.select(fromPosts.getAllPostPreviewsLoadedStatus);

    this.subscriptions.push(this.store.select(getMeId).subscribe((id) => {
      this.meid = id;
      this.store.dispatch(new postActions.LoadPostPreviewsAction({
        feedtype: 'Home',
        userid: this.meid,
        offset: this.offset,
        limit: this.limit
      }));
    }));
  }

  searchMore(postsLength: number) {
    this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
  }

  navigateToPostDialog(post: Post) {
    this.store.dispatch(new postActions.SelectPostAction(post._id));
    this.postDialogRef = this.dialog.open(PostDetailPopupComponent, {
      panelClass: 'full-screen'
    });
    this.postDialogRef.afterClosed()
      .subscribe(result => {
        this.postDialogRef = null;
      });

    event.preventDefault();
    this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
  }

  navigateToPost(post: Post) {
    this.router.navigate(['/posts', post._id]);
    this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
  }

  ngOnDestroy() {
    this.store.dispatch(new postActions.ClearPostStoreAction());
  }

}

