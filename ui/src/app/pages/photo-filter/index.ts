import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatIconModule, MatButtonModule, MatDialogModule, MatSidenavModule, MatRippleModule, MatRadioModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FiltersPageComponent } from './filters-page';
import { StoreModule } from '@ngrx/store';
import { PhotoComponent } from './components/photo-filters/components/photo/photo';
import { ImageLoaderComponent } from './components/photo-filters/components/image-loader/image-loader';
import { PreviewGalleryComponent } from './components/photo-filters/components/gallery/preview-gallery';
import { GalleryComponent } from './components/photo-filters/components/gallery/gallery';
import { SpinnerLoaderComponent } from './components/photo-filters/components/spinner-loader/spinner-loader';
import { filtersReducer } from './filter-data/reducers/filters-reducer';
import { UniqueSelectionDispatcher } from './components/photo-filters/core/coordination/unique-selection-dispatcher';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatGestureConfig } from './components/photo-filters/core/gestures/md-gesture-config';
import { FiltersActions } from './filter-data/actions/filters-actions';
import { FiltersService } from './filter-data/services/filters-service';
import {ImageCropperModule} from 'ng2-img-cropper';
import { KsSliderComponent } from './components/photo-filters/components/slider/ks-slider';

const components = [
  PhotoComponent,
  KsSliderComponent,
  ImageLoaderComponent,
  PreviewGalleryComponent,
  GalleryComponent,
  SpinnerLoaderComponent,
  FiltersPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    MatRadioModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ImageCropperModule,
    LazyLoadImageModule,
    HttpModule,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forFeature('filters', filtersReducer)
  ],
  declarations: components,
  exports: components,
  providers: [
    FiltersActions,
    FiltersService,
    UniqueSelectionDispatcher,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MatGestureConfig },
  ],
  entryComponents: [FiltersPageComponent]
})
export class PhotosFilterModule { }
