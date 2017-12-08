import { Action } from '@ngrx/store';
import { Route } from '@angular/router';
import { type } from '../util';

export const ActionTypes = {
  EDIT_TITLE:   type('[SiteData] Edit Title'),
  ADD_ROUTES: 	type('[SiteData] Add Routes'),
  ADD_ANIMATION: type('[Animation] Add Animation'),
  REMOVE_ANIMATION: type('[Animation] Remove Animation'),
  SET_TRANSITION: type('[Animation] Set Animation Transition State'),
  TOGGLE_ADMIN: type('[SiteData] Toggle Admin View'),
  TOGGLE_EDIT: type('[SiteData] Toggle Edit View'),
  Toggle_SIDENAV: type('[SiteData] Togglet Side Nav'),
  PREV_ROUTE: type('[Route] Prev Route')
};

export class ToggleSideNavAction   implements Action {
  type = ActionTypes.Toggle_SIDENAV;
  constructor(public payload:null = null){}
}

export class EditSiteTitleAction implements Action {
  type = ActionTypes.EDIT_TITLE;
  constructor(public payload:null = null){}
}

export class AddRoutesAction implements Action {
	type = ActionTypes.ADD_ROUTES;
	constructor(public payload: Route[]){}
}
export class PrevRouteAction implements Action {
	type = ActionTypes.PREV_ROUTE;
	constructor(public payload: any){}
}

export class AddBlockingAnimationAction implements Action {
	type = ActionTypes.ADD_ANIMATION;
	constructor(public payload: null){}
}

export class RemoveBlockingAnimationAction implements Action {
	type = ActionTypes.REMOVE_ANIMATION;
	constructor(public payload: null){}
}

export class SetTransitionAction implements Action {
	type = ActionTypes.SET_TRANSITION;
	constructor(public payload: boolean){}
}

export class ToggleAdminAction implements Action {
  type = ActionTypes.TOGGLE_ADMIN;
  constructor(public payload: boolean){}
}

export class ToggleEditAction implements Action {
  type = ActionTypes.TOGGLE_EDIT;
  constructor(public payload: boolean){}
}


export type Actions
  = EditSiteTitleAction
  | AddRoutesAction
  | AddBlockingAnimationAction
  | RemoveBlockingAnimationAction
  | SetTransitionAction
  | ToggleAdminAction
  | ToggleEditAction
  | ToggleSideNavAction
  | PrevRouteAction;
