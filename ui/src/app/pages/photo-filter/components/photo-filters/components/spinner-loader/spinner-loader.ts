import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'spinner-loader',
  styleUrls:['./spinner-loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="loading-wrap" *ngIf="loading">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
  `
})
export class SpinnerLoaderComponent {
  @Input() loading: boolean;
}
