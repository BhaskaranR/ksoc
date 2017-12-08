import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { NewCommentComponent } from './newcomment/newcomment.component';
import { CommentListComponent } from './comment-list/comments-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatCardModule } from '@angular/material';
import { AvatarModule } from '../avatar-image/index';
import { FileUploadModule } from 'ng2-file-upload';
// import {EmojiPickerModule} from 'ng-emoji-picker';
import { EmojipickerModule } from '../emojipicker/index';
import { FlexLayoutModule } from '@angular/flex-layout';

const components = [
    NewCommentComponent,
    CommentListComponent,
    CommentItemComponent, 
  ];

@NgModule({
  imports: [
    CommonModule,
    EmojipickerModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    AvatarModule,
    FlexLayoutModule
  ],
  declarations: components,
  exports: components
})
export class CommentsModule {}
