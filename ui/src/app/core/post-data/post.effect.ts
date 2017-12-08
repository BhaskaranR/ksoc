import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as post from './post.action';
import { PostService } from './post.service';
import { Post, postComment, favor, PostInput } from './post-model';
import { Subscription } from 'rxjs/Subscription';
import { LoadPostPreviewsCompleteAction } from './post.action';
import * as fromRoot from '../../reducers';
import * as profile from '../../core/profile-data/profile.selector';



@Injectable()
export class PostEffects {

   @Effect()
    post$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.POST)
        .map((action: post.PostAction) => action.payload)
        .switchMap((postData: PostInput) =>
            Observable.combineLatest(this.postService.addPost(postData), this.store.select(profile.getMe))
                .map(([pd, me]) => {
                    const newPost = Object.assign({}, pd, {
                        userFirstName: me.firstName,
                        userLastName: me.lastName,
                        userImgNormal: me.images.normal,
                        userImgSmall: me.images.small
                    })
                  return  new post.PostCompleteAction(newPost)})
                .catch((ex) => of(new post.PostFailAction(ex)))
        );

  /*  @Effect()
    post$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.POST)
        .map((action: post.PostAction) => action.payload)
        .switchMap((postData: Post) =>
             this.postService.addPost(postData)
                .map((pd) => new post.PostCompleteAction(pd))
                .catch((ex) => of(new post.PostFailAction(ex)))
        );*/

    @Effect()
    coment$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.COMMENT_POST)
        .map((action: post.CommentAction) => action.payload)
        .switchMap((commentData: postComment) =>
            this.postService.addComment(commentData)
                .map((pd) => new post.CommentCompleteAction(pd))
                .catch((ex) => of(new post.CommentFailAction(ex)))
        );

    @Effect()
    favor$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.FAVOR_POST)
        .map((action: post.FavorAction) => action.payload)
        .switchMap((favor: favor) =>
            this.postService.favorPost(favor)
                .map((fa: any) => new post.FavorCompleteAction(fa))
                .catch((ex) => of(new post.FavorFailAction(ex)))
        );

    @Effect()
    togglefavor$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.TOGGLE_FAVOR_POST)
        .map((action: post.ToggleFavorAction) => action.payload)
        .switchMap((favor: favor) =>
            this.postService.toggleFavorPost(favor)
                .map((fa: any) => new post.FavorCompleteAction(fa))
                .catch((ex) => of(new post.FavorFailAction(ex)))
        );

    @Effect()
    unfavor$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.UNFAVOR_POST)
        .map((action: post.UnFavorAction) => action.payload)
        .switchMap((favor: favor) =>
            this.postService.unFavorPost(favor)
                .map((fa: any) => new post.FavorCompleteAction(fa))
                .catch((ex) => of(new post.FavorFailAction(ex)))
        );

    @Effect()
    loadPostPreviews$: Observable<Action> = this.actions$
    .ofType(post.ActionTypes.LOAD_POST_PREVIEWS)
    .map((action: post.LoadPostPreviewsAction) => action.payload)
    .switchMap(payload => {
        const nextLoad$ = this.actions$.ofType(post.ActionTypes.LOAD_POST_PREVIEWS).skip(1);
        return this.postService.loadPostPreviews(payload)
        .takeUntil(nextLoad$)
        .takeUntil(this.actions$.ofType(post.ActionTypes.ALL_POST_PREVIEWS_LOADED))
        .takeUntil(this.actions$.ofType(post.ActionTypes.CLEAR_STORE_ACTION))
        .map(posts => {
            if (posts.length == 0)
                return new post.AllPostsLoadedAction(null);
            return new post.LoadPostPreviewsCompleteAction(posts)
        }).catch((ex) => of (new post.PostFailAction(ex)))
    })

   /* @Effect()
    loadFileTypePostPreviews$: Observable<Action> = this.actions$
    .ofType(post.ActionTypes.LOAD_FILE_TYPES_PREVIEWS)
    .map((action: post.LoadFileTypePreviewsAction) => action.payload)
    .switchMap(payload => {
        return this.postService.loadFileTypePreviews(payload).map(posts => {
            if (posts.length == 0)
                return new post.AllPostsLoadedAction(null);
            return new post.LoadPostPreviewsCompleteAction(posts)
        })
    })
    .takeUntil(this.actions$.ofType(post.ActionTypes.CLEAR_STORE_ACTION))
    .takeUntil(this.actions$.ofType(post.ActionTypes.ALL_POST_PREVIEWS_LOADED));
*/

    @Effect()
    loadMorePostPreviews$: Observable<Action> = this.actions$
        .ofType(post.ActionTypes.LOAD_MORE_POST_PREVIEWS)
        .map((action: post.LoadMorePostPreviewsAction) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.postService.fetchMore(payload))
                .takeUntil(this.actions$.ofType(post.ActionTypes.ALL_POST_PREVIEWS_LOADED))
                .map(resp => {
                    const feeds =  resp.data.feeds  ? resp.data.feeds: resp.data.feedsByPostTypes
                    if ( feeds.length == 0)
                        return new post.AllPostsLoadedAction(null);

                    return new post.LoadPostPreviewsCompleteAction(feeds)
                })
        })


	/* @Effect()
	loadPostPreviewsComplete$: Observable<Action> = this.actions$
		.ofType(post.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE)
		.startWith( new post.LoadPostPreviewsCompleteAction(initialPosts))
		.map((action: post.LoadPostPreviewsCompleteAction) => {
			const posts = action.payload;
			const routes = posts.map(post => {
				return Object.assign({}, {
					path: post.path,
					component: PostViewComponent
				});
			});
			return new siteData.AddRoutesAction(routes)
		});
        */

	/* @Effect()
	selectPost: Observable<Action> = this.actions$
		.ofType(post.ActionTypes.SELECT_POST)
		.map((action: post.SelectPostAction) => action.payload)
		.mergeMap( post => {
			if (post.contentLoaded) {
				return Observable.of(new post.LoadPostContentAction({id: post._id, content: post.text}));
			} else {
				return this.postService.loadPostContent(post.id)
					.map(content => {
						return new postActions.LoadPostContentAction({id: post.id, content: content});
					});
			}
		});*/

    // @Effect() selectPost = this.actions$
    // .ofType(post.ActionTypes.SELECT_POST)
    // .map((action: post.SelectPostAction) => action.payload)
    // .switchMap( (id) =>
    //     this.postService.getPostbyId(id)
    //     // .switchMap(post =>
    //     //   {
    //     //    return Observable.of(new post.LoadPostPreviewsCompleteAction(post.postByPostId));
    //     //   }
    //     //   )
    // )
    constructor(private actions$: Actions, private postService: PostService, private store: Store<fromRoot.AppState>) {

    }

}
