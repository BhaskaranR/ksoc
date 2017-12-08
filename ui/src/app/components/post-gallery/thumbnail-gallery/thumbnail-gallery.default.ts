import { GalleryConfig } from '../../ks-gallery/config/gallery.config';
import { GalleryState } from '../../ks-gallery/service/gallery.state';

export const defaultState: GalleryState = {
  images: undefined,
  prevIndex: 0,
  currIndex: 0,
  hasNext: undefined,
  hasPrev: undefined,
  active: false
};

export const defaultConfig: GalleryConfig = {
  style: {
    background: '#fff',
    width: '100%',
    height: '300px'
  },
  animation: 'fade',
  loader: {
    width: '50px',
    height: '50px',
    position: 'center',
    icon: 'oval'
  },
  description: {
    position: 'bottom',
    overlay: false,
    text: true,
    counter: true,
    style: {
      color: 'red'
    }
  },
  bullets: false,
  player: {
    autoplay: false,
    speed: 3000
  },
  thumbnails: {
    width: 320,
    height: 280,
    position: 'left',
    space: 0
  }
};



