// import { AppRoutes } from '../../app.routing';
import { AppData } from './app.model';
import * as appActions from './app.action';
import { createSelector } from 'reselect';

declare var window: any;

const initialState: AppData = {
	title: null,
	iconUrl: null,
	animationData: {
		pageTransitionActive: false,
		blockingAnimations: 0
	},
  pathToIndex: null,
	isAdmin: false,
	sideNavOpen : false,
	adminModeActive: false,
  editModeActive: false,
  prevRoute: null,
};

export function reducer(state = initialState, action: appActions.Actions): AppData {
	switch (action.type) {
		/*case appActions.ActionTypes.ADD_ROUTES: {
			const payload = <Route[]>action.payload;
			return Object.assign({}, state, {
				routes: [...state.routes, ...payload]
			});
		}*/
		case appActions.ActionTypes.ADD_ANIMATION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations + 1,
					pageTransitionActive: state.animationData.pageTransitionActive
				}
			});
		}
		case appActions.ActionTypes.REMOVE_ANIMATION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations - 1,
					pageTransitionActive: state.animationData.pageTransitionActive
				}
			});
		}
		case appActions.ActionTypes.SET_TRANSITION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations,
					pageTransitionActive: action.payload
				}
			});
		}
		case appActions.ActionTypes.TOGGLE_ADMIN: {
			return Object.assign({}, state, {
				adminModeActive: action.payload
			});
		}
		case appActions.ActionTypes.TOGGLE_EDIT: {
			return Object.assign({}, state, {
				editModeActive: action.payload
			});
		}
		case appActions.ActionTypes.Toggle_SIDENAV: {
					return Object.assign({}, state, {
				sideNavOpen: !state.sideNavOpen
			});
    }
    	case appActions.ActionTypes.PREV_ROUTE: {
					return Object.assign({}, state, {
				prevRoute: action.payload
			});
		}
		default: {
    		return state;
		}
	}

}

export const getSiteIconSrc = (state: AppData) => state.iconUrl;

export const getSiteTitle = (state: AppData) => state.title;

// export const getRoutes = (state: AppData) => state.routes;
export const getPrevRoute = (state: AppData) => state.prevRoute;

export const getAnimationData = (state: AppData) => state.animationData;

export const getPathToIndex = (state: AppData) => state.pathToIndex;

export const getAdminModeActive = (state: AppData) => state.adminModeActive;

export const getEditModeActive = (state: AppData) => state.editModeActive;

export const getSideNavState = (state: AppData) => state.sideNavOpen;

export const getAdminState = createSelector(getAdminModeActive, getEditModeActive, (adminModeActive, editModeActive) => {
  return Object.assign({},
  {adminMode: adminModeActive},
  {editMode: editModeActive});
});

