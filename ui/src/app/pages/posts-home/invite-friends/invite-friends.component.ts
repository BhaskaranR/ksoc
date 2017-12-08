import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../ks-home/email-validator/email.validator';

/**
 * @title Dialog Overview
 */
@Component({
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent {
  form: FormGroup;
  submitted = false;

    

  constructor(
      private iv: FormBuilder
  ) { }

  ngOnInit() {
     this.form = this.iv.group({
         mail: ['', [Validators.required, EmailValidator.validEmail]]
     });
 }
 options = [
    'paulsonps@neoito.com',
    'amalshehu@neoito.com',
    'bahsker@karmasoc.com'
   ];
}