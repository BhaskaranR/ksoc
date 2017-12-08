import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailValidator } from '../email-validator/email.validator';
import { AccountService } from '../../../core/auth-data/auth.service';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Register';
  loginLink = '/login';

  submitted: boolean = false;
  errorDiagnostic: string;
  form: FormGroup;
  isregistered: boolean;
  displayEmailError:boolean;
  displayPwError:boolean;
  displayFnError:boolean;
  displayLnError:boolean;

  constructor(
    private accountService: AccountService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      'lastName': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      'phoneNumber':['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+')]],
      'mail': ['', [Validators.required, EmailValidator.validEmail]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });

    console.log(this.form.controls);
  }

  onSubmit() {
    this.submitted = true;

    this.errorDiagnostic = null;
    if(!this.form.valid) {
      return;
    }

    this.accountService.register(this.form.value).subscribe(data => {
      this.isregistered = true;
    },
      error => {
        this.submitted = false;
        this.errorDiagnostic = error;
      });
  }
}
