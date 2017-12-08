import { FilterStyle, OverlayStyle } from '../../filter-data/interfaces';

export interface GalleryModel {
  key: string;
  figureStyle: FilterStyle;
  overlayStyle: OverlayStyle;
  image: string;
  labelName: string;
}

export interface HammerInstance {
  on(eventName: string, callback: Function): void;
  off(eventName: string, callback: Function): void;
}
