import { Component, ViewChild, HostBinding, AnimationTransitionEvent, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { animations } from '../animations';
import { Store } from '@ngrx/store';

import * as siteDataActions from '../../core/app-data/app.action';

import * as fromRoot from '../../reducers';
import * as appActions from '../../core/app-data/app.action';
import * as appSelector from '../../core/app-data/app.selector';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as fromBiz from '../../business-core/business-data/business.selector';
import * as bizActions from '../../business-core/business-data/business.action';

import { UpdateImagePopup } from '../../components/profile-core/update_image_popup';
import { ProfileEducationInfoPopup } from '../../components/profile-core/profile_education_info_popup';
import { ProfileAddInfoPopup } from '../../components/profile-core/add_info_popup';
import { ProfilePlaceInfoPopup } from '../../components/profile-core/profile_place_info_popup';
import { ProfileSiteUrlPopup } from '../../components/profile-core/profile_site_url_info_popup';
import { ProfilePersonalInfoPopup } from '../../components/profile-core/profile_personal_info_popup';
import { ProfileWorkContactInfoPopup } from '../../components/profile-core/profile_work_contact_info_popup';
import { ProfileWorkHistoryPopup } from '../../components/profile-core/profile_work_history_popup';

import { ActivatedRoute, Router } from '@angular/router';
import { Business } from '../../business-core/business-data/business.model';

@Component({
	selector: 'app-aboutbiz',
	templateUrl: './about-biz.html',
	styleUrls: ['./about-biz.css'],
	animations: animations
})

export class AboutBizComponent implements OnDestroy {
	viewType = 3;

	biz$: Observable<Business>;
	enableAdminMode = false;

	item: Subscription;
	meid: string;

	constructor(private store: Store<fromRoot.AppState>,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog, private router: Router) {

		this.biz$ = this.store.select(fromBiz.getSelectedBiz);
		this.item = Observable.combineLatest(
			activatedRoute.params
		).subscribe(([params]) => {
			this.store.dispatch(new bizActions.GetAndSelectBusinessAction(params["id"]));
		});

	}

	animationDone($event: AnimationTransitionEvent) {
		if ($event.fromState !== 'void') {
			if ($event.toState === 'in') {
				this.store.dispatch(new siteDataActions.SetTransitionAction(false));
			}
			else if ($event.toState === 'out') {
				this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
			}
		}
	}

	openUpdateImagePopup() {
		this.dialog.open(UpdateImagePopup)
	}
	openUpdateEducationPopup() {
		this.dialog.open(ProfileEducationInfoPopup)
	}

	openUpdateAddInfoPopup() {
		this.dialog.open(ProfileAddInfoPopup)
	}

	openUpdatePlacePopup() {
		this.dialog.open(ProfilePlaceInfoPopup)
	}

	openUpdateSiteUrlPopup() {
		this.dialog.open(ProfileSiteUrlPopup)
	}

	openUpdateWorkPopup() {
		this.dialog.open(ProfilePersonalInfoPopup)
	}

	openProfileWorkContactInfoPopup() {
		this.dialog.open(ProfileWorkContactInfoPopup)
	}

	openProfileWorkHistoryPopup() {
		this.dialog.open(ProfileWorkHistoryPopup)
	}

	ngOnDestroy() {
		this.item.unsubscribe();
	}


	openProfileLink() {
		this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
	}

}
