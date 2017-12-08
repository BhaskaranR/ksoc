import { MomentModule } from 'angular2-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatButtonModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotosModule } from '../../components/photos/index';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PostsModule } from '../../components/posts';
import { PhotoFeedsComponent } from './photo-feeds.component';
import { MasonryModule } from 'angular2-masonry';
import { Routes, RouterModule } from '@angular/router';
import { GalleryModule } from '../../components/ks-gallery/gallery.module';


const routes: Routes = [
  {
      path: '',
      component: PhotoFeedsComponent
  }
];

export const routing = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    PhotosModule,
    FlexLayoutModule,
    PostsModule,
    LazyLoadImageModule,
    GalleryModule,
    MasonryModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    SharedModule,
    MomentModule,
    routing
  ],
  declarations: [
    PhotoFeedsComponent,
    PhotoViewComponent
  ],
  exports: [
    PhotoFeedsComponent,
    PhotoViewComponent
  ]
})
export class PhotoFeedsModule { }
