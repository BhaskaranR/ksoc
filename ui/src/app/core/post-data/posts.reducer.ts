import * as posts from './post.action';
import { Post, Posts } from './post-model';
import { createSelector } from 'reselect';

const initialState: Posts = {
	ids: [],
	entities: {},
	selectedPostId: null,
	loadingPostPreviews: false,
	currentAPIPage: 1,
	allPostPreviewsLoaded: false,
};

export function reducer(state = initialState, action: any): Posts {
	switch (action.type) {
		case posts.ActionTypes.POST_COMPLETE:
			return {
				ids: [action.payload._id, ...state.ids],
				entities: Object.assign({}, { [action.payload._id]: action.payload }, state.entities),
				selectedPostId: state.selectedPostId,
				loadingPostPreviews: false,
				currentAPIPage: state.currentAPIPage,
				allPostPreviewsLoaded: false
			};
		case posts.ActionTypes.POST_FAIL:
			return action.payload;

		case posts.ActionTypes.SELECT_POST: {
			return Object.assign({}, state, {
				selectedPostId: action.payload
			});
		}
		case posts.ActionTypes.LOAD_MORE_POST_PREVIEWS: {
			return Object.assign({}, state, {
				loadingPostPreviews: true
			});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS: {
			return Object.assign({}, initialState, {
				loadingPostPreviews: true
			});
		}
		case posts.ActionTypes.LOAD_POST_PREVIEWS_COMPLETE: {
			const respPosts = action.payload;
			const newPosts = respPosts.filter(post => !state.entities[post._id]).map(post => {
				return Object.assign({}, post, { loadedAfterBootstrap: true });
			});
			const newPostIds = newPosts.map(post => post._id);
			const newPostEntities = newPosts.reduce((entities: { [id: string]: Post }, post: Post) => {
				return Object.assign(entities, {
					[post._id]: post
				});
			}, {});
			return {
				ids: [...state.ids, ...newPostIds],
				entities: Object.assign({}, state.entities, newPostEntities),
				selectedPostId: state.selectedPostId,
				loadingPostPreviews: false,
				currentAPIPage: state.currentAPIPage + 1,
				allPostPreviewsLoaded: false
			};
		}
		case posts.ActionTypes.ALL_POST_PREVIEWS_LOADED: {
			return Object.assign({}, state, {
				loadingPostPreviews: false,
				allPostPreviewsLoaded: true
			});
		}
		case posts.ActionTypes.LOAD_POST_CONTENT: {
			const idOfPostToLoad = action.payload.id;
			const content = action.payload.content;
			const postEntityToUpdate = state.entities[idOfPostToLoad];
			const updatedPost = Object.assign({}, postEntityToUpdate, { content: content, contentLoaded: true });
			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[idOfPostToLoad]: updatedPost
				})
			});
		}
		case posts.ActionTypes.CLEAR_STORE_ACTION: {
			return initialState;
		}
		default: {
			return state;
		}
	}
}

export const getEntities = (state: Posts) => state.entities;

export const getIds = (state: Posts) => state.ids;

export const getPostsLength = (state: Posts) => state.ids.length;

export const getSelectedPostId = (state: Posts) => state.selectedPostId;

export const getPostsLoading = (state: Posts) => state.loadingPostPreviews;

export const getPostsPreviewLoadedStatus = (state: Posts) => state.allPostPreviewsLoaded;

export const getPostPreviewsLoadingStatus = (state: Posts) => state.loadingPostPreviews;

export const getCurrentAPIPage = (state: Posts) => state.currentAPIPage;

export const getSelectedPost = createSelector(getEntities, getSelectedPostId, (entities, selectedId) => {
	return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
	if (!ids) {
		return null;
	}
	return ids.map(id => entities[id]);
});

export const getSelectedPostAllImages = createSelector(getSelectedPost, (entity: Post) => {
	const posts: Post[] = [];
	if (entity.photos && entity.photos.length > 1) {
		entity.photos.forEach(photo => {
			posts.push(Object.assign({},
				entity, {
					photos: [photo]
				}
			));
		});
	} else {
		posts.push(entity);
	}
	return posts;
});


/*
export const getAllImages = createSelector(getAll, (entities) => {
	const images: Post[] = [];
	entities.forEach(entity => {
		entity.photos.forEach(photo =>{
			images.push(Object.assign({},
				entity, {
					photos: [photo]
				}
			));
		});
	});
	return images;
});
*/
