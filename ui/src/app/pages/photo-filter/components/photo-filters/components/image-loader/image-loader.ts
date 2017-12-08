import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
@Component({
  selector: 'image-loader',
  styleUrls: ['./image-loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="imageLoader">
    <img [src]="image">
  </div> 
  `
})
export class ImageLoaderComponent {
  @Input() image: string;
}