import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2, OnInit, EventEmitter, Output } from '@angular/core';
import { GalleryState } from '../services/post-gallery.state';
import { GalleryConfig } from '../../ks-gallery/config/gallery.config';

declare const Hammer: any;

@Component({
  selector: 'thumb',
  templateUrl: './thumbnail.html',
  styleUrls: ['./thumbnail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  contStyle;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

    this.contStyle = this.getContainerStyle();

    /** Enable gestures */
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        const el = this.el.nativeElement;
        const mc = new Hammer(el);

        mc.on('panstart', () => {
          this.renderer.removeClass(el, 'g-pan-reset');
        });
        mc.on('panend', () => {
          this.renderer.addClass(el, 'g-pan-reset');
        });

        /** Pan left and right */
        mc.on('pan', (e) => {
          this.renderer.setStyle(el, 'transform', `translate3d(${e.deltaX}px, 0px, 0px)`);
        });
        /** Swipe next and prev */
        mc.on('swipeleft', () => {
          this.next.emit();
        });
        mc.on('swiperight', () => {
          this.prev.emit();
        });
      }
  }

  translateThumbs() {
    const x = this.state.currIndex * this.config.thumbnails.width + this.config.thumbnails.width / 2;
    return `translate3d(${-x}px, 0, 0)`;
  }

  getContainerStyle() {
    /** Set thumbnails position (top, bottom) */
    const order = this.config.thumbnails.position === 'top' ? 0 : 2;
    this.renderer.setStyle(this.el.nativeElement, 'order', order);

    return {
      height: this.config.thumbnails.height + 'px',
      margin: this.config.thumbnails.space + 'px'
    };
  }

}
