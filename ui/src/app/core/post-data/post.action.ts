import { Action } from '@ngrx/store';
import { type } from '../util';
import { Post, postComment, favor, feedsRequest, feedsRequestWithTypes, PostInput } from './post-model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  POST:           type('[Post] Post'),
  POST_COMPLETE:  type('[Post] Post Complete'),
  POST_FAIL:      type('[Post] Post Fail'),
  FAVOR_POST:     type('[Post] Favor'),
  TOGGLE_FAVOR_POST:     type('[Post] Toggle Favor'),
  UNFAVOR_POST:   type('[Post] UnFavor Post'),
  FAVOR_POST_SUCCESS: type('[Post] Favor Success'),
  FAVOR_POST_FAIL: type('[Post] Favor Fail'),
  COMMENT_POST:    type('[Comment] Post'),
  COMMENT_POST_COMPLETE:  type('[Comment] Post Complete'),
  COMMENT_POST_FAIL:      type('[Comment] Post Fail'),
  SELECT_POST:   type('[Posts] Select Post'),
  LOAD_MORE_POST_PREVIEWS: type('[Posts] Load More Posts'),
  // LOAD_FILE_TYPES_PREVIEWS: type('[Posts] Load File types posts'),
  LOAD_POST_PREVIEWS: type('[Posts] Load Posts'),
  LOAD_POST_PREVIEWS_COMPLETE: type('[Posts] Load Posts Complete') ,
  ALL_POST_PREVIEWS_LOADED: type('[Posts] All Posts Loaded'),
  LOAD_POST_CONTENT: type('[Posts} Load Post Content'),
  SHOW_EDIT_MENU: type('[Posts] Show Edit Post Menu'),
  CLEAR_STORE_ACTION: type('[Posts] Clear the store')
};


export class PostAction implements Action {
  type = ActionTypes.POST;

  constructor(public payload: PostInput) { }
}

export class ClearPostStoreAction implements Action {
  type = ActionTypes.CLEAR_STORE_ACTION;
}

export class PostCompleteAction implements Action {
  type = ActionTypes.POST_COMPLETE;

  constructor(public payload: Post) { }
}

export class PostFailAction implements Action {
  type = ActionTypes.POST_FAIL;

  constructor(public payload: any) { }
}

export class FavorAction implements Action {
  type = ActionTypes.FAVOR_POST;

  constructor(public payload: favor) { }
}

export class ToggleFavorAction implements Action {
  type = ActionTypes.TOGGLE_FAVOR_POST;

  constructor(public payload: favor) { }
}

export class UnFavorAction implements Action {
  type = ActionTypes.UNFAVOR_POST;

  constructor(public payload: favor) { }
}





export class FavorCompleteAction implements Action {
  type = ActionTypes.FAVOR_POST_SUCCESS;

  constructor(public payload: favor) { }
}

export class FavorFailAction implements Action {
  type = ActionTypes.FAVOR_POST_FAIL;

  constructor(public payload: any) { }
}


export class CommentAction implements Action {
  type = ActionTypes.COMMENT_POST;

  constructor(public payload: postComment) { }
}

export class CommentCompleteAction implements Action {
  type = ActionTypes.COMMENT_POST_COMPLETE;

  constructor(public payload: postComment) { }
}

export class CommentFailAction implements Action {
  type = ActionTypes.COMMENT_POST_FAIL;

  constructor(public payload: any) { }
}

export class SelectPostAction implements Action {
  type = ActionTypes.SELECT_POST;
  constructor(public payload: string) {}
}

export class LoadPostPreviewsAction implements Action {
	type = ActionTypes.LOAD_POST_PREVIEWS;
	constructor(public payload: feedsRequest | feedsRequestWithTypes ) {}
}

/*export class LoadFileTypePreviewsAction implements Action {
	type = ActionTypes.LOAD_FILE_TYPES_PREVIEWS;
	constructor(public payload: { postTypes: string[], userid: string, offset: number, limit: number}) {}
} */

export class LoadMorePostPreviewsAction implements Action {
	type = ActionTypes.LOAD_MORE_POST_PREVIEWS;
	constructor(public payload: number) {}
}


export class LoadPostPreviewsCompleteAction implements Action {
	type = ActionTypes.LOAD_POST_PREVIEWS_COMPLETE;
	constructor(public payload: Post[]) {}
}

export class AllPostsLoadedAction implements Action {
  type = ActionTypes.ALL_POST_PREVIEWS_LOADED;
  constructor(public payload: null = null) {}
}

export class LoadPostContentAction implements Action {
  type = ActionTypes.LOAD_POST_CONTENT;
  constructor(public payload: {id: string, content: string}) {}
}

export class ShowEditPostMenuAction implements Action {
  type = ActionTypes.SHOW_EDIT_MENU;
  constructor(public payload: {postId: string, editing: {active: boolean, target: string, error: string}}){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = PostAction
  | PostCompleteAction
  | PostFailAction
  | FavorAction
  | ToggleFavorAction
  | UnFavorAction
  | FavorCompleteAction
  | FavorFailAction
  | CommentAction
  | CommentCompleteAction
  | CommentFailAction
  | SelectPostAction
  // | LoadFileTypePreviewsAction
  | LoadMorePostPreviewsAction
  | LoadPostPreviewsAction
  | LoadPostPreviewsCompleteAction
  | AllPostsLoadedAction
  | LoadPostContentAction
  | ShowEditPostMenuAction
  | ClearPostStoreAction;
