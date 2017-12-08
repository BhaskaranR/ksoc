import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CheckinComponent } from './checkin/checkin.component';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatDialogModule, MatMenuModule,MatListModule, MatInputModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule, MatIconModule, MatButtonModule } from '@angular/material';

import { NewPostComponent } from './newpost/newpost';
import { SharedModule } from '../../shared/shared.module';
import { PhotosModule } from "app/components/photos";
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NewPromoPostComponent } from './newpromopost/newpromopost.component';
import { AgmCoreModule } from '@agm/core';
import { MarkdownModule } from 'angular2-markdown';
import { AvatarModule } from '../../components/avatar-image';
import { UserGroupListComponent } from './usergroup/usergroup-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './imageupload-data/imageupload.reducer';
import { ImageUploadEffects } from './imageupload-data/imageupload.effect';
import { ImageUploadService } from './imageupload-data/imageupload.service';
import { MentionModule } from '../../components/mention/mention.module';
import { PhotosFilterModule } from '../photo-filter';


const components = [
  NewPostComponent,
  NewPromoPostComponent,
  CheckinComponent,
  UserGroupListComponent
];

@NgModule({
  imports: [
    CommonModule,
    PhotosModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MarkdownModule.forRoot(),
    HttpModule,
    FileUploadModule,
    FlexLayoutModule,
    MatListModule,
    AvatarModule,
    MentionModule,
    LazyLoadImageModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    }),
    StoreModule.forFeature('tempImages', reducer),
    EffectsModule.forFeature([ImageUploadEffects])
  ],
  declarations: components,
  exports: components,
  providers: [
    ImageUploadService,
  ],
  entryComponents: [
    NewPostComponent,
    NewPromoPostComponent,
    CheckinComponent,
    UserGroupListComponent]
})
export class NewPostModule { }
