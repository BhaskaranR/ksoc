import { Injectable, Optional } from '@angular/core';

import { GalleryConfig } from '../config/gallery.config';
import { defaultState, defaultConfig } from '../config/gallery.default';

@Injectable()
export class GalleryService {

  config: GalleryConfig = defaultConfig;

  constructor( @Optional() config: GalleryConfig) {

    this.config = Object.assign({}, defaultConfig, config);
  }

}