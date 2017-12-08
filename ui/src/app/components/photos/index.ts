import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatIconModule, MatButtonModule, MatDialogModule} from '@angular/material';
import { GalleryPostsComponent } from './gallery-posts/gallery-posts.component';
import { ImageService } from './gallery-posts/shared/image.service';
import { ImagePreview } from './image-preview';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadPhotoComponent } from './upload_photo/upload_photo';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const components = [
   UploadPhotoComponent,
    GalleryPostsComponent,
    ImagePreview
  ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LazyLoadImageModule
  ],
  declarations: components,
  exports: components,
  providers: [
    ImageService
  ]
})
export class PhotosModule {}
