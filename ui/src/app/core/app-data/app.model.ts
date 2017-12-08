export interface AppData {
	title: string;
	iconUrl: string;
	animationData: AnimationData;
	pathToIndex: string;
	isAdmin: boolean;
	sideNavOpen: boolean;
	adminModeActive: boolean;
  editModeActive: boolean;
  prevRoute: string;
}

export interface AnimationData {
	pageTransitionActive: boolean;
	blockingAnimations: number;
}
