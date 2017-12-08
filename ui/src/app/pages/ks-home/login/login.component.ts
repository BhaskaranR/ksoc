import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/observable/interval';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../email-validator/email.validator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import * as tokenActions from '../../../core/token-data/token.action';
import { AccountService } from '../../../core/auth-data/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    authenticated = false;

    fbAuthUrl;
    googleplusAuthUrl;
    displayEmailError:boolean;
    displayPwError:boolean;

    constructor(private accountService: AccountService,
                private route: ActivatedRoute,
        private fb: FormBuilder,
        private store: Store<AppState>,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<LoginComponent>
    ) { }

    ngOnInit() {
       // this.store.select()
        this.form = this.fb.group({
            mail: ['', [Validators.required, EmailValidator.validEmail]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
        });

        console.log(this.form);
        // this.setFbAuthURL();
        // this.setGooglePlusAuthURL();
    }

    setFbAuthURL() {
        this.accountService.getFbAuthUrl()
            .subscribe(url => {
                console.log('fb url ', url);
                this.fbAuthUrl = url;
            },
            error => console.log('Error occurred while retrieving fb auth url : ' + error));
    }

    setGooglePlusAuthURL() {
        this.accountService.getGoogleAuthUrl()
            .subscribe(url => {
                console.log('google url ', url);
                this.googleplusAuthUrl = url;
            },
            error => console.log('Error occurred while retreiving google plus auth url : ' + error));
    }

    onSubmit() {
        if(!this.form.valid) {
            return;
          }
        this.store.dispatch(new tokenActions.LoginAction({ 'loginModel': this.form.value, returnUrl: this.route.snapshot.queryParams['returnUrl'] || '/home' }));
        this.dialogRef.close();
    }
}
