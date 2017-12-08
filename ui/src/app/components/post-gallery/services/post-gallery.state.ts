import { Post } from '../../../core/post-data/post-model';
export interface GalleryState {
    active: boolean;
    play?: boolean;
    posts?: Post[];
    prevIndex?: number;
    currIndex?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  }