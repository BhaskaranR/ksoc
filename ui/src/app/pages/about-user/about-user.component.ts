import { Component, ViewChild, HostBinding, OnInit, AnimationTransitionEvent, ViewEncapsulation, OnDestroy, Inject, ElementRef } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatListModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { animations } from '../animations';
import { Store } from '@ngrx/store';

import * as siteDataActions from '../../core/app-data/app.action';

import * as fromRoot from '../../reducers';
import * as appActions from '../../core/app-data/app.action';
import * as appSelector from '../../core/app-data/app.selector';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { User } from '../../core/user-data/user-model';

import * as fromProfile from '../../core/profile-data/profile.selector';
import * as fromUser from '../../core/user-data/user.selector';
import * as userActions from '../../core/user-data/user.action';
import * as profileActions from '../../core/profile-data/profile.action';

import { UpdateImagePopup } from '../../components/profile-core/update_image_popup';
import { ProfileEducationInfoPopup } from '../../components/profile-core/profile_education_info_popup';
import { ProfileAddInfoPopup } from '../../components/profile-core/add_info_popup';
import { ProfilePlaceInfoPopup } from '../../components/profile-core/profile_place_info_popup';
import { ProfileSiteUrlPopup } from '../../components/profile-core/profile_site_url_info_popup';
import { ProfilePersonalInfoPopup } from '../../components/profile-core/profile_personal_info_popup';
import { ProfileWorkContactInfoPopup } from '../../components/profile-core/profile_work_contact_info_popup';
import { ProfileWorkHistoryPopup } from '../../components/profile-core/profile_work_history_popup';
import { ActivatedRoute, Router } from '@angular/router';

import { FileUploader, Headers } from 'ng2-file-upload';
import { PhotoDetails } from '../../core/services/photodetails';
import { AuthHttp } from 'angular2-jwt';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-aboutuser',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css'],
  animations: animations
})

export class AboutUserComponent implements OnDestroy, OnInit {
  contactPrivacy: any;
  me$: Observable<User>;
  currentMedia: string;

  viewType = 3;

  user$: Observable<User>;
  enableAdminMode = false;
  meid: string;

  private subscriptions: Subscription[] = [];


  displayOptions = {
    public: {
      name: 'Public',
      value: 'public',
      icon: 'public'
    },
    private: {
      name: 'Private',
      value: 'private',
      icon: 'lock'
    },
    friends: {
      name: 'Friends',
      value: 'friends',
      icon: 'group'

    }
  };
  options = [
    {
      name: 'Public',
      value: 'public',
      icon: 'public'
    },
    {
      name: 'Private',
      value: 'private',
      icon: 'lock'
    },
    {
      name: 'Friends',
      value: 'friends',
      icon: 'group'

    }
  ];
  privacySettings = {
    contactInfo: 'public',
    education: 'public',
    sites: 'public',
    work: 'public',
    places: 'public'
  }
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  image$: Subscription;
  image: PhotoDetails;

  constructor(private store: Store<fromRoot.AppState>,
    public _media: ObservableMedia,
    @Inject('apiBase') private apiBase: string,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog, private router: Router) {


  }

  ngOnInit() {

    this.me$ = this.store.select(fromProfile.getMe);

    this.subscriptions.push(Observable.combineLatest(
      this.store.select(fromProfile.getMeId),
      this.activatedRoute.params
    ).subscribe(([me, params]) => {
      if (me !== params["id"]) {
        this.meid = me
        this.user$ = this.store.select(fromUser.getSelectedUser);
        this.store.dispatch(new userActions.GetAndSelectUserAction(params["id"]));
      }
      else {
        this.user$ = this.me$;
        this.enableAdminMode = true
      }
    }));


    this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
			this.currentMedia = change.mqAlias;
    }));

    let tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      let authHeaders: Headers = { name: 'authorization', value: `Bearer${tokens.access_token}` };
      this.uploader = new FileUploader({ url: `${this.apiBase}/users/bgimage`, headers: [authHeaders], disableMultipart: false });
    }

    this.uploader.onAfterAddingAll = f => {
      this.uploader.uploadAll();
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const resp = JSON.parse(response);
      const image: PhotoDetails = {
        small: resp.images.small,
        normal: resp.images.normal,
        key: resp.images.key,
        large: '',
        xlarge: '',
        ext: resp.images.normal.substring(resp.images.normal.indexOf(".") + 1)
      }
      this.store.dispatch(new profileActions.UpdateProfileBGImageSuccessAction(image));
    };

  }

  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }
  uploadClick(event: Event) {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    event.preventDefault();
  }
  updateSitePrivacy(data, option){
    let sites = {
      siteUrls: data,
      visibility: option.value
    }
    this.store.dispatch(new profileActions.UpdateUserCustomUrls(sites));
  }
  updatePersonalPrivacy(data, option, type: string){
    let privacy = `${type}Privacy`;
    data[privacy] = option.value;
    this.store.dispatch(new profileActions.UpdateUserPersonalInfo(data));
  }
  updatePlacesPrivacy(user, option) {
    this.privacySettings.places = option.value;
    let data = user;
    data.visibility = option.value
    this.store.dispatch(new profileActions.UpdateUserPlacesHistory(data));

  }
  updateEducationPrivacy(user, option) {
    this.privacySettings.education = option.value;
    let data = {
      educationHistory: user.userEducationHistory.educationHistory,
      visibility: option.value
    };
    this.store.dispatch(new profileActions.UpdateUserEducationHistory(data));
  }
  updateWorkPrivacy(user, option) {
    this.privacySettings.work = option.value;
    let workHistory = {
      workHistory: user,
      visibility: option.value
    };
    this.store.dispatch(new profileActions.UpdateUserWorkHistory(workHistory));

  }
  updateContactPrivacy(user, selectedOption) {
    this.privacySettings.contactInfo = selectedOption.value;
    let data = user.userPersonalContact;
    data.visibility = selectedOption.value
    this.store.dispatch(new profileActions.UpdateUserPersonalContact(data));

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
  openUpdateImagePopup(userData) {
    this.dialog.open(UpdateImagePopup, {
      data: userData,
    })
  }
  openUpdateEducationPopup(edu) {
    let educationDialogRef = this.dialog.open(ProfileEducationInfoPopup, {
      data: edu,
    })
    educationDialogRef.afterClosed().subscribe(result => {
      let userEducationHistory = [];
      let data = {
        educationHistory: userEducationHistory,
        visibility: this.privacySettings.education
      };
      if (result) {
        result.schoolInfo.map(item => {
          userEducationHistory.push({
            schoolName: item.schoolName,
            major: item.course,
            year: item.startDate,
            endyear: item.endDate,
            description: item.description
          });
        });
        this.store.dispatch(new profileActions.UpdateUserEducationHistory(data));
      }
    });

  }
  openUpdateAddInfoPopup() {
    this.dialog.open(ProfileAddInfoPopup)
  }
  openUpdatePlacePopup(place) {
    let placeDialogRef = this.dialog.open(ProfilePlaceInfoPopup, {
      data: place
    })
    placeDialogRef.afterClosed().subscribe(result => {

      if (result) {
        let placesHistory = {
          currentPlace: result.currentPlace,
          livedPlaces: result.livedPlaces,
          visibility: this.privacySettings.places
        }
        this.store.dispatch(new profileActions.UpdateUserPlacesHistory(placesHistory));
      }

    });
  }
  openUpdateSiteUrlPopup(site) {
    let siteDialogRef = this.dialog.open(ProfileSiteUrlPopup, { data: site, })
    siteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.visibility = this.privacySettings.sites
        this.store.dispatch(new profileActions.UpdateUserCustomUrls(result));
      }
    });
  }
  openUpdatePersonalInfoPopup(personalInfo) {
    let personalDialogRef = this.dialog.open(ProfilePersonalInfoPopup,
      {
        data: personalInfo,
      })
    personalDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result.visibility = this.privacySettings.personalinfo;
        this.store.dispatch(new profileActions.UpdateUserPersonalInfo(result));
      }
    });
  }
  openProfileWorkContactInfoPopup(contactInfo) {
    let contactDialogRef = this.dialog.open(ProfileWorkContactInfoPopup, {
      data: contactInfo
    })
    contactDialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          'website': result.emails,
          'phonenumber': result.phones,
          'address': result.addresses,
          'visibility': this.privacySettings.contactInfo
        }
        this.store.dispatch(new profileActions.UpdateUserPersonalContact(data));
      }
    });
  }
  openProfileWorkHistoryPopup(work) {
    let workDialogRef = this.dialog.open(ProfileWorkHistoryPopup
      , {
        data: work,
      })
    workDialogRef.afterClosed().subscribe(result => {
      if (result) {
        let workHistory = {
          workHistory: result.workedCompanies,
          visibility: this.privacySettings.work
        };
        this.store.dispatch(new profileActions.UpdateUserWorkHistory(workHistory));
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openProfileLink() {
    this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
  }
}
