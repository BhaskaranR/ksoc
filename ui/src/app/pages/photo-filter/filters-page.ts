import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/of';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FiltersService } from './filter-data/services/filters-service';
import { overlayOptions } from './filter-data/constants';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'filters-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./filters-page.scss'],
  templateUrl: './filters-page.html'
})
export class FiltersPageComponent implements OnInit, AfterViewInit {
  options: Object[] = overlayOptions || [];
  isActive: boolean;
  customFilters: boolean = true;

  currentMedia: string;

  data: any;
  cropperSettings: CropperSettings;
  selectedImageSrc: string;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  subscriptions: Subscription[] = []

  constructor(
    public dialogRef: MatDialogRef<FiltersPageComponent>,
    public filters: FiltersService,
    public _media: ObservableMedia,
    protected store: Store<fromRoot.AppState>,
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
  }

  async ngOnInit() {
    this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
      this.currentMedia = change.mqAlias;
    }));
    this.subscriptions.push(this.filters.selectedImage$.subscribe(imagesrc => {
      this.selectedImageSrc = imagesrc;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  async ngAfterViewInit() {
    // const image = await this.loadImage(this.selectedImageSrc);
    // this.cropper.setImage(image);
  }


  async loadImage(url): Promise<any> {
    return new Promise(resolve => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        resolve(image);
      };
      image.src = `http://crossorigin.me/${url}`;
    });
  }



  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  selectedIndex = 1;

  showDiv(index) {
    this.selectedIndex = index;
  }

  select({ figureStyle, overlayStyle, key }: { figureStyle: any, overlayStyle: any, key: string }): void {
    this.customFilters = false;
    this.filters.change({
      value: {
        figureStyle: figureStyle,
        overlayStyle: overlayStyle,
        key: key
      },
      type: FiltersService.PRESET
    });
  }

  change({ value, type }: { value: number, type: string }): void {
    this.customFilters = true;
    this.filters.change({ value, type });
  }

  /*
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
*/

  applyFilter() {
    this.filters.savedFilterState$.subscribe(val => {
      this.dialogRef.close({
       applyFilter: val
      });
    });
  }
}