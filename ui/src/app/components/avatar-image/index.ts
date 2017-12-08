import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { AvatarComponent } from './avatar';
import { FileUploadModule } from 'ng2-file-upload';
import { LetterAvatarComponent } from './avatar-letter';
import {  MatIconModule } from '@angular/material';

const components = [
   AvatarComponent,
   LetterAvatarComponent,
  ];

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: components,
  exports: components
})
export class AvatarModule {}
