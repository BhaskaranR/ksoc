import * as posts from './post.action';
import { favor } from './post-model';

const initialState: favor = {
    postId: null,
   favor: null
};

export function reducer(state = initialState, action: any): favor {
	switch (action.type) {
		case posts.ActionTypes.FAVOR_POST_SUCCESS: {
            return Object.assign({}, action.payload);
		}
		default: {
      		return state;
		}
	}
}

export const getmynewfavoured = (state: favor) => state;
