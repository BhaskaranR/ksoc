import { GalleryModel } from './../../interfaces';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnChanges, AfterViewInit, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromJS } from 'immutable';
import * as Swiper from 'swiper';
import 'rxjs/add/operator/debounceTime';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'preview-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:['./gallery.scss'],
  template:`
  <section>
    <div class="swiper-container" #swiper
      [ngClass]="{'is-active': active}">
      <div class="swiper-wrapper">
        <div class="swiper-slide" *ngFor="let record of images; let idx = index;">
          <spinner-loader [loading]="record.loading"></spinner-loader>
          <div *ngIf="record.image !== null"  class="thumb">
            <figure class="thumb__figure">
              <div></div>
              <img class="thumb__img" [src]="record.image">
            </figure>

             <button mat-icon-button (click)="editPhoto(record.image)">
                                    <mat-icon>edit</mat-icon>
                                </button>
              <button mat-icon-button (click)="removePhoto(record.image)">
                                    <mat-icon>close</mat-icon>
                                </button>
          </div>
        </div>
      </div>
      <div class="swiper-scrollbar" #scrollbar></div>
    </div>
    </section>
  `
})
export class PreviewGalleryComponent implements AfterViewInit {

  @Input() images: {image: string, loading:boolean}[] = [];

  @Input() active: boolean = true;
  @Output() onEdit= new EventEmitter<string>();

  @ViewChild('swiper') swiperGallery: ElementRef;
  @ViewChild('scrollbar') scrollbar: ElementRef;

  private selected: number;

  constructor() {}

  ngAfterViewInit(): void {
    const mySwiper = new Swiper(this.swiperGallery.nativeElement, {
      slidesPerView: 'auto',
      scrollbar: this.scrollbar.nativeElement,
    });
  }

    editPhoto(photo) {
      this.onEdit.emit(photo);
  }
}
