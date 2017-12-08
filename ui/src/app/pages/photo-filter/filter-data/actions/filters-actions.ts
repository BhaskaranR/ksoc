import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class FiltersActions {
  static CHANGE_CONTRAST: string        = 'CHANGE_CONTRAST';
  static CHANGE_BRIGHTNESS: string      = 'CHANGE_BRIGHTNESS';
  static CHANGE_SATURATE: string        = 'CHANGE_SATURATE';
  static CHANGE_SEPIA: string           = 'CHANGE_SEPIA';
  static CHANGE_GRAYSCALE: string       = 'CHANGE_GRAYSCALE';
  static CHANGE_INVERT: string          = 'CHANGE_INVERT';
  static CHANGE_HUEROTATE: string       = 'CHANGE_HUEROTATE';
  static CHANGE_BLUR: string            = 'CHANGE_BLUR';
  static CHANGE_BLEND: string           = 'CHANGE_BLEND';
  static CHANGE_PRESET: string          = 'CHANGE_PRESET';
  static LOAD_IMAGES: string            = 'LOAD_IMAGES';
  static FETCH_IMAGES_FAILED: string    = 'FETCH_IMAGES_FAILED';
  static FETCH_IMAGES_FULFILLED: string = 'FETCH_IMAGES_FULFILLED';
  static CHANGE_SELECTED_IMAGE: string  = 'CHANGE_SELECTED_IMAGE';
  static RESET_DEFAULTS: string         = 'RESET_DEFAULTS';
  static LOADING: string                = 'LOADING';

  changeContrast(value: number, type: string = 'contrast') {
    return {
      type: FiltersActions.CHANGE_CONTRAST,
      payload: {
        value,
        type
      }
    };
  }

  changeBrightness(value: number, type: string = 'brightness') {
    return {
      type: FiltersActions.CHANGE_BRIGHTNESS,
      payload: {
        value,
        type
      }
    };
  }

  changeSaturate(value: number, type: string = 'saturate') {
    return {
      type: FiltersActions.CHANGE_SATURATE,
      payload: {
        value,
        type
      }
    };
  }

  changeSepia(value: number, type: string = 'sepia') {
    return {
      type: FiltersActions.CHANGE_SEPIA,
      payload: {
        value,
        type
      }
    };
  }

  changeGrayScale(value: number, type: string = 'grayScale') {
    return {
      type: FiltersActions.CHANGE_GRAYSCALE,
      payload: {
        value,
        type
      }
    };
  }

  changeInvert(value: number, type: string = 'invert') {
    return {
      type: FiltersActions.CHANGE_INVERT,
      payload: {
        value,
        type
      }
    };
  }

  changeHueRotate(value: number, type: string = 'hueRotate') {
    return {
      type: FiltersActions.CHANGE_HUEROTATE,
      payload: {
        value,
        type
      }
    };
  }

  changeBlur(value: number, type: string = 'blur') {
    return {
      type: FiltersActions.CHANGE_BLUR,
      payload: {
        value,
        type
      }
    };
  }

  changeBlend(value: string, type: string = 'blend') {
    return {
      type: FiltersActions.CHANGE_BLEND,
      payload: {
        value,
        type
      }
    };
  }

  changeLoading(value: boolean, type: string = 'loading') {
    return {
      type: FiltersActions.LOADING,
      payload: {
        value
      }
    };
  }

  changePreset({ figureStyle, overlayStyle, key }: { figureStyle: any, overlayStyle: any, key: string }) {
    return {
      type: FiltersActions.CHANGE_PRESET,
      payload: {
        figureStyle,
        overlayStyle,
        key
      }
    };
  }

  fetchImagesFailed(error: any) {
    return {
      type: FiltersActions.FETCH_IMAGES_FAILED,
      payload: {
        error
      }
    };
  }

  fetchImagesFulfilled(data: any) {
    return {
      type: FiltersActions.FETCH_IMAGES_FULFILLED,
      payload: {
        data: Object.assign([], data)
      }
    };
  }

  changeSelectImage(value: string, type: string = 'selectedImage') {
    return {
      type: FiltersActions.CHANGE_SELECTED_IMAGE,
      payload: {
        value,
        type
      }
    };
  }

  resetToDefaults() {
    return {
      type: FiltersActions.RESET_DEFAULTS
    };
  }
}