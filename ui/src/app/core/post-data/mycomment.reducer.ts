import * as posts from './post.action';
import { postComment} from './post-model';

const initialState: postComment = {
	 _id : null,
    postId: null,
    text: null,
    photos: null,
    withFriends: null,
    postType: null,
    likes: null,
    userId: null,
    userFirstName: null,
    userLastName: null,
    userImgNormal: null,
    userImgSmall: null,
    fileUrl: null
};

export function reducer(state = initialState, action: any): postComment {
	switch (action.type) {
		case posts.ActionTypes.COMMENT_POST_COMPLETE: {
            return Object.assign({}, action.payload);
		}
		default: {
      		return state;
		}
	}
}

export const getNewComment = (state: postComment) => state;
