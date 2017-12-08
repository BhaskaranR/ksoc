import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { OverlayStyle, FilterStyle } from '../../../../filter-data/interfaces';

@Component({
  selector: 'photo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:['./photo.scss'],
  template:`
  <div class="photo">
    <figure [ngStyle]="filter">
      <spinner-loader [loading]="loading"></spinner-loader>
      <div class="overlay_div" [ngStyle]="overlay"></div>
      <image-loader [image]="image"></image-loader>
    </figure>
  </div>
  `
})
export class PhotoComponent {
  @Input() overlay: OverlayStyle;
  @Input() filter: FilterStyle;
  @Input() image: string;
  @Input() loading: boolean;
}
