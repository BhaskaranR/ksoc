import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { ThumbNavComponent } from './thumbnail-nav/thumbnail-nav';
import { ThumbnailGalleryComponent } from './thumbnail-gallery/thumbnail-gallery';
import { ThumbComponent } from './thumbnail/thumbnail';
import { TapThumbnailDirective } from './directives/tapthumbnail.directive';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatIconModule, MatButtonModule, MatDialogModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const components = [
    ThumbNavComponent,
    ThumbnailGalleryComponent,
    ThumbComponent,
    TapThumbnailDirective
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
  exports: components
})
export class PostGalleryModule {}
