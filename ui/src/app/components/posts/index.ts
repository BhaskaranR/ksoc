import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatMenuModule, MatCardModule, MatIconModule, MatButtonModule, MatGridListModule, MatTooltipModule } from '@angular/material';
import { MentionModule } from '../mention';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PhotosModule } from "app/components/photos";
import { AvatarModule } from '../avatar-image';
import { CommentsModule } from '../comments';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AgmCoreModule } from '@agm/core';
import { EmojiModule } from 'angular-emojione';
import { MarkdownModule } from 'angular2-markdown';
import { MomentModule } from 'angular2-moment';
import { MasonryModule } from "angular2-masonry";
import { GalleryModule } from '../ks-gallery/gallery.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactionsModule } from '../reactions/reactions-module';

export const galleryConfig: any  = {
  "animation": "fade",
  "loader": true,
  "description": {
    "position": "bottom",
    "overlay": true,
    "text": false,
    "counter": true
  },
  "bullets": {
    "position": "bottom"
  },
  "player": {
    "autoplay": false,
    "speed": 3000
  },
  "thumbnails": false,
  "navigation": true,
  "gestures": true
}

const components = [
  PostListComponent,
  PostItemComponent,
];

@NgModule({
  imports: [
    MatTooltipModule,
    CommonModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollDispatchModule,
    ReactionsModule,
    PhotosModule,
    MarkdownModule.forRoot(),
    FlexLayoutModule,
    GalleryModule.forRoot(galleryConfig),
    AvatarModule,
    CommentsModule,
    LazyLoadImageModule,
    MentionModule,
    MomentModule,
    MasonryModule,
    EmojiModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    })
  ],
  declarations: components,
  exports: components
})
export class PostsModule { }
