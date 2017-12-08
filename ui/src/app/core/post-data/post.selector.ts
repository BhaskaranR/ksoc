import { createSelector } from 'reselect';
import { getPostsState, getNewPostCommentState, getNewFavorPostState } from '../../reducers';
import * as fromPosts from './posts.reducer';
import { getMe } from '../profile-data/profile.selector';
import * as newComment from './mycomment.reducer';
import * as newFavored from './myfavored.reducer';


export const getAllPosts = createSelector(getPostsState, fromPosts.getAll);

// export const getAllImagePostsAsGallery = createSelector(getPostsState, fromPosts.getAllImages);

export const getPostsLoading = createSelector(getPostsState, fromPosts.getPostsLoading);

export const getAllPostPreviewsLoadedStatus = createSelector(getPostsState, fromPosts.getPostsPreviewLoadedStatus);

export const getPostPreviewsLoadingStatus = createSelector(getPostsState, fromPosts.getPostPreviewsLoadingStatus);

export const getCurrentAPIPage = createSelector(getPostsState, fromPosts.getCurrentAPIPage);

export const getPostEntities = createSelector(getPostsState, fromPosts.getEntities);

export const getPostsLength = createSelector(getPostsState, fromPosts.getPostsLength);

export const getSelectedPost = createSelector(getPostsState, fromPosts.getSelectedPost);

export const getSelectedPostWithAllImages = createSelector(getPostsState, fromPosts.getSelectedPostAllImages);

export const getNewComment = createSelector(getNewPostCommentState, newComment.getNewComment);

export const getMyNewPostComment = createSelector(getNewComment, getMe, (comment, me) => {
    if (!comment._id) {
        return null;
    }
    return Object.assign(comment, {
                userFirstName: me.firstName,
                userLastName: me.lastName,
                userImgNormal: me.images.normal,
                userImgSmall: me.images.small
            });
});

export const getNewFavoured = createSelector(getNewFavorPostState, newFavored.getmynewfavoured);


export const getMyNewFavored  = createSelector(getNewFavoured, getMe, (favored, me) => {
    return  favored ? Object.assign({}, {
                userId: me._id,
                postId: favored.postId,
                favor: favored.favor,
                userFirstName: me.firstName,
                userLastName: me.lastName,
                userImgNormal: me.images.normal,
                userImgSmall: me.images.small
            }) : null;
});
