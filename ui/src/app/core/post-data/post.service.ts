import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as postModel from './post-model';
import { AuthHttp } from 'angular2-jwt';
import { Apollo, QueryRef } from 'apollo-angular';

import { postComment, favor, Post, feedsRequest, feedsRequestWithTypes } from './post-model';
import {FetchPolicy, WatchQueryOptions,  ApolloQueryResult} from 'apollo-client';
import { feedQuery, imagesQuery, postByquery } from './post.query';
//fix
@Injectable()
export class PostService {
  postObj: any;

  private feedObs: QueryRef<Post[]>;

    constructor(private authHttp: AuthHttp,
        @Inject('apiBase') private apiBase: string,
        private apollo: Apollo
    ) {
    }

    loadPostPreviews(variables: any): Observable<Post[]> {
        const queryOptions:any = {
            query: feedQuery,
            variables: variables

        };
        this.feedObs = this.apollo.watchQuery(queryOptions as WatchQueryOptions);
        return this.feedObs.valueChanges.map(( data: any ) => {
            return variables.feedtype ? data.data.feeds : data.data.feedsByPostTypes;
        });
    }

    fetchMore(offset: number): Promise<ApolloQueryResult<any>> {
        return this.feedObs.fetchMore({
            variables: {
                offset: offset,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                return  fetchMoreResult.feeds ? fetchMoreResult.feeds :  fetchMoreResult.feedsByPostTypes;
            }
        });
    }

    addPost(post: postModel.PostInput): Observable<postModel.Post> {
        return this.authHttp.post(`${this.apiBase}/posts/new`, post)
            .map(res => (res.json() as postModel.Post));
    }

    addComment(post: postModel.postComment): Observable<postModel.postComment> {
        return this.authHttp.post(`${this.apiBase}/posts/${post.postId}/impressions/text`, post)
            .map(res => (res.json().data as postModel.postComment));
    }


    editPost(post: postModel.Post): Observable<postModel.Post> {
        return this.authHttp.post(`${this.apiBase}/posts/edit`, post)
            .map(res => (res.json() as postModel.Post));
    }

    deletePost(postId: string): Observable<boolean> {
        return this.authHttp.delete(`${this.apiBase}/posts/${postId}`)
            .map(res => (res.json() as boolean));
    }

    favorPost(favor: favor): Observable<postModel.Favorites> {
        return this.authHttp.post(`${this.apiBase}/post/${favor.postId}/favor`, favor)
            .map(res => (res.json()));
    }

    toggleFavorPost(favor: favor): Observable<postModel.Favorites> {
        return this.authHttp.post(`${this.apiBase}/post/${favor.postId}/favor/toggle`, favor)
            .map(res => (res.json()));
    }

    unFavorPost(favor: favor): Observable<postModel.Favorites> {
        return this.authHttp.post(`${this.apiBase}/post/${favor.postId}/unfavor`, {})
            .map(res => (res.json()));
    }


    postImpression(postId: string, impression: postModel.Impression): Observable<postModel.Impression> {
        return this.authHttp.post(`${this.apiBase}/posts/${postId}/impressions/text`, impression)
            .map(res => (res.json() as postModel.Impression));
    }

    editImpression(impression: postModel.Impression): Observable<postModel.Impression> {
        return this.authHttp.post(`${this.apiBase}/posts/edit`, impression)
            .map(res => (res.json() as postModel.Impression));
    }

    deleteImpression(impressionId: string): Observable<boolean> {
        return this.authHttp.delete(`${this.apiBase}/posts/{impressionId}`)
            .map(res => (res.json() as boolean));
    }

    bookMarkPost(post: number, bookMark: postModel.Bookmark[]): Observable<postModel.Post> {
        return this.authHttp.post(`${this.apiBase}/posts/{postId}`, bookMark)
            .map(res => (res.json() as postModel.Post));
    }

    sharePost(post: postModel.SharePost): Observable<postModel.Post> {
        return this.authHttp.delete(`${this.apiBase}/posts/{postId}`)
            .map(res => (res.json() as postModel.Post));
    }
    getPostbyId(postid: string){
      const queryOptions:any = {
            query: postByquery ,
            variables: { postid: postid}
        };
        this.postObj = this.apollo.watchQuery(queryOptions as WatchQueryOptions);
        return this.postObj.map(({ data }) => data);

    }
}
