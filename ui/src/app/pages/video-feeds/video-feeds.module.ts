import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VideoFeedsComponent } from './video-feeds.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideosModule } from "app/components/videos";
import { MasonryModule } from 'angular2-masonry';
import { MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';




const routes: Routes = [
    {
        path: '',
        component: VideoFeedsComponent
    },
    {
        path: ':id',
        component: VideoDetailComponent
    }
  ];
  
  export const routing = RouterModule.forChild(routes);
  
const components = [
    VideoFeedsComponent,
    VideoDetailComponent
];

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        VideosModule,
        FlexLayoutModule,
        MasonryModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        routing
    ],
    declarations: components,
    exports: components,
})
export class VideosFeedsModule { }
