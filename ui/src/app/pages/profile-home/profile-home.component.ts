import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Component, OnInit, ViewChild, HostBinding, Input, OnDestroy, Inject, AfterViewInit, NgZone, NgModule } from '@angular/core';
import { animations } from '../animations';
import { MatSidenav, MatIconRegistry, MatDialog, MatDialogRef } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserAction } from '../../core/user-data/user-model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as fromUser from '../../core/user-data/user.selector';
import * as userActions from '../../core/user-data/user.action';
import * as fromProfile from '../../core/profile-data/profile.selector';
import * as fromPosts from '../../core/post-data/post.selector';
import { Post } from '../../core/post-data/post-model';
import * as postActions from '../../core/post-data/post.action';
import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';
import * as appActions from '../../core/app-data/app.action';
import { NewPostComponent } from '../new-post/newpost/newpost';
import * as profileActions from '../../core/profile-data/profile.action';
import * as businessActions from '../../business-core/business-data/business.action'
import * as fromBusiness from '../../business-core/business-data/business.selector';
import { Business } from '../../business-core/business-data/business.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile-home.component.html',
	styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit, AfterViewInit, OnDestroy {

	images: any[] = [];
	num = 1;

	private offset: number = 0;
	private limit: number = 5;
	dialogRef: MatDialogRef<NewPostComponent>;

	protected me$: Observable<User>;
	private subscriptions: Subscription[] = [];
	protected meid: string;
	items$: Observable<Post[]>;
	loading$: Observable<boolean>;
	allPostsLoaded$: Observable<boolean>;
	user$: Observable<User>;
	peopleFollowing$: Observable<UserAction[]>;
    business$: Observable<{ entity: Business, action: string }[]>;
	currentMedia: string;
	followActionText;
	isMe: boolean;

	tabLinks = [
		{ label: 'About me', link: 'aboutme' },
		{ label: 'My Page', link: 'myPage' },
		{ label: 'My Shop', link: 'myshop' }
	];

	constructor(
		private _ngZone: NgZone,
		@Inject(DOCUMENT) private document: Document,
		protected router: Router,
		protected apollo: Apollo, protected store: Store<fromRoot.AppState>,
		protected activatedRoute: ActivatedRoute,
		public _media: ObservableMedia,
		sanitizer: DomSanitizer, protected dialog: MatDialog) {
	
		this.me$ = this.store.select(fromProfile.getMe);
		this.items$ = this.store.select(fromPosts.getAllPosts);
		this.loading$ = this.store.select(fromPosts.getPostsLoading);
		this.allPostsLoaded$ = this.store.select(fromPosts.getAllPostPreviewsLoadedStatus);

		for (this.num; this.num <= 9; this.num += 1) {
			this.images.push(this.num);
		}

	}

	ngOnInit() {

		this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
			this.currentMedia = change.mqAlias;
		}));

		this.subscriptions.push(Observable.combineLatest(
			this.store.select(fromProfile.getMeId),
			this.activatedRoute.params,
			this.store.select(fromUser.getSelectedUserIsMyFollowing)
		).subscribe(([me, params, userMyFollowing]) => {
			if (me !== params["id"]) {
				this.user$ = this.store.select(fromUser.getSelectedUser);
				this.peopleFollowing$ = this.store.select(fromUser.getSelectedUserFollowingWithAction);
				this.followActionText = userMyFollowing ? "Unfollow" : "Follow";
				this.store.dispatch(new userActions.GetAndSelectUserAction(params["id"]));
				this.store.dispatch(new userActions.GetUserFollowingAction(params["id"]));
				this.isMe = false;
			}
			else {
				this.user$ = this.store.select(fromProfile.getMe);
				this.peopleFollowing$ = this.store.select(fromUser.getMyFollowingWithAction);
				this.business$ = this.store.select(fromBusiness.getAllBusinessWithAction);
				
				this.store.dispatch(new profileActions.GetMyFollowingAction());
				this.store.dispatch(new businessActions.GetMyBusinessAction());
				this.store.dispatch(new businessActions.GetMyBizFollowingAction());
				this.isMe = true
			}

			this.store.dispatch(new postActions.LoadPostPreviewsAction({
				feedtype: 'MyProfilePage',
				userid: params["id"],
				offset: this.offset,
				limit: this.limit
			}));


		}));
	}


	isOver(): boolean {
		return (this.currentMedia == "sm" || this.currentMedia == "xs")
	}

	ngAfterViewInit() {
		if (this.currentMedia == "xs" || this.currentMedia == "sm") return;
		this.subscriptions.push(Observable.timer(0).subscribe(() =>
			this._ngZone.onStable.first().subscribe(() =>
				this.document.body.scrollTop = 500)));

	}

	searchMore(postsLength: number) {
		this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
	}

	ngOnDestroy() {
		this.store.dispatch(new postActions.ClearPostStoreAction());
		this.subscriptions.forEach(subsc => subsc.unsubscribe());
	}


	gotoDetail(id: string) {
		this.router.navigate(['/detail', id], { relativeTo: this.activatedRoute.root });
	}
	navigateToPost(post: Post) {
		this.router.navigate(['/posts', post._id]);
		this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
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

}