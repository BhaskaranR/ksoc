import { Component, OnInit, AnimationTransitionEvent, ViewChild, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as siteDataActions from '../../core/app-data/app.action';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import * as fromRoot from '../../reducers';
import { MatSidenav, MatDialog, MatIconRegistry } from '@angular/material';
import { animations } from '../animations';
import { Observable } from 'rxjs/Observable';
import { User, Settings } from '../../core/user-data/user-model';
import * as profileActions from '../../core/profile-data/profile.action';

import * as fromProfile from '../../core/profile-data/profile.selector';

import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { UpdateSettings } from '../../core/profile-data/profile.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './passwordvalidator';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings.html',
  styleUrls: ['./settings-home.css'],
  animations: animations
})
export class SettingsComponent implements OnInit {
  public mediaChange;
  subscriptions: Subscription[] = [];

  activeTransitionAnimation: boolean;
  fireTransition: string;
  activeLinkIndex: number = 0;

  meid: string;

  currentMedia: string;

  private user$: Observable<User>;
  form: FormGroup;

  barLabel: string = "Password strength:";

  get notifyposts() {
    return this.settings.notifyposts;
  }

  set notifyposts(val: string) {
    if (val === this.settings.notifyposts) return;
    this.settings.notifyposts = val;
    this.onChange();
  }

  get listposts() {
    return this.settings.listposts;
  }

  set listposts(val: string) {
    if (val === this.settings.listposts) return;
    this.settings.listposts = val;
    this.onChange();
  }

  get commentposts() {
    return this.settings.commentposts;
  }

  set commentposts(val: string) {
    if (val === this.settings.commentposts) return;
    this.settings.commentposts = val;
    this.onChange();

  }

  get profile() {
    return this.settings.profile;

  }

  set profile(val: string) {
    if (val == this.settings.profile) return;
    this.settings.profile = val;
    this.onChange();

  }


  get following() {
    return this.settings.following;
  }

  set following(val: string) {
    if (val === this.settings.following) return;
    this.settings.following = val;
    this.onChange();

  }

  get enablenotifications() {
    return this.settings.enablenotifications;
  }

  set enablenotifications(val: boolean) {
    if (val === this.settings.enablenotifications) return;
    this.settings.enablenotifications = val;
    this.onChange();

  }

  get enableemail() {
    return this.settings.enableemail;
  }

  set enableemail(val: boolean) {
    if (val === this.settings.enableemail) return;
    this.settings.enableemail = val;
    this.onChange();
  }


  settings: Settings = {
    notifyposts: "public",
    listposts: "public",
    commentposts: "public",
    profile: "public",
    following: "public",
    enablenotifications: true,
    enableemail: true
  }


  circles = [
    { value: 'private', viewValue: 'Private' },
    { value: 'public', viewValue: 'Public' },
    { value: 'friends', viewValue: 'Friends' }
  ];

  constructor(protected store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder,
    public _media: ObservableMedia,
    private router: Router, private activatedRoute: ActivatedRoute) {

    this.subscriptions.push(store.select(fromProfile.getMySettings).subscribe(settings => {
      this.settings = settings;
    }));
    this.user$ = store.select(fromProfile.getMe);

    this.subscriptions.push(this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    }));

    this.form = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
      new_password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
      confirm_password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  ngOnInit() {
  }

  onChange() {
    this.store.dispatch(new profileActions.UpdateSettings(this.settings));
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

  openProfileLink() {
    this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
  }

  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  tabChanged(indx: number) {
    this.activeLinkIndex = indx;
  }

  changepassword(event: Event) {
    if (this.form.invalid) return;
    console.log(this.form.value);
    let formval = this.form.value;
    delete formval.confirm_password;
    this.store.dispatch(new profileActions.ChangeUserPassword(formval));
    event.preventDefault();
  }


  ngOnDestroy() {
    this.subscriptions.map(subs => subs.unsubscribe());
  }
}