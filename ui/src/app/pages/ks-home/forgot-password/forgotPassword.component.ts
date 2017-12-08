
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import * as fromRoot from '../../../reducers/index';
import * as profileActions from '../../../core/profile-data/profile.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ks-forgot',
  templateUrl: './forgotPassword.component.html',
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  displayEmailError:boolean;

  constructor(private fb: FormBuilder, private router: Router,
    private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      mail: [ null, Validators.compose( [ Validators.required, CustomValidators.email ] ) ]
    } );
  }

  onSubmit(event: any) {
    if (this.form.valid){
      this.store.dispatch(new profileActions.ForgotUserPassword(this.form.value))
    }
    event.preventDefault();
  }
}

