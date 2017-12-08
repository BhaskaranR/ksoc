import { ChangeDetectionStrategy, Component, OnInit, Input, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { defaultState, defaultConfig } from './thumbnail-gallery.default';
import { GalleryConfig } from '../../ks-gallery/config/gallery.config';
import { Post } from '../../../core/post-data/post-model';
import { GalleryState } from '../services/post-gallery.state';

@Component({
    selector: 'thumbnail-gallery',
    templateUrl: './thumbnail-gallery.html',
    styleUrls: ['./thumbnail-gallery.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThumbnailGalleryComponent implements OnInit {

    @Input()
    post: Post[]
    
    loading;
    thumbDirection;

    config: GalleryConfig;

    state: BehaviorSubject<GalleryState>;

    constructor( @Inject('apiBase') private apiBase: string) {
    }

    ngOnInit() {
        /** Initialize the state */
        this.state = new BehaviorSubject<GalleryState>(defaultState);
        /** Initialize the config */
        this.config = defaultConfig;
        this.load(this.post);
    }


    /** Load images and reset the state */
    load(post: Post[]) {
        this.state.next({
            posts: post,
            currIndex: 0,
            hasNext: post.length > 1,
            hasPrev: false,
            active: false
        });
    }

    /** Set current image and update the state */
    set(index: number) {
        const state = this.state.getValue();
        this.state.next(Object.assign({}, state, {
            prevIndex: state.currIndex,
            currIndex: index,
            hasNext: index < state.posts.length - 1,
            hasPrev: index > 0,
            active: true
        }));
    }

    /** Go to next image and update the state */
    next() {
        const state = this.state.getValue();
        if (state.hasNext) {
            const index = state.currIndex + 1;
            this.set(index);
        } else {
            this.set(0);
        }
    }

    /** Go to previous image and update the state */
    prev() {
        const state = this.state.getValue();
        if (state.hasPrev) {
            const index = state.currIndex - 1;
            this.set(index);
        } else {
            this.set(state.posts.length - 1);
        }
    }

}
