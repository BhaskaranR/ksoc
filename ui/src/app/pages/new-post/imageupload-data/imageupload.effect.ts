import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as imageUploadActions from './imageupload.action';
import { ImageUploadService } from './imageupload.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ImageUploadEffects {

    @Effect()
    removeTempIamge$: Observable<Action> = this.actions$
        .ofType(imageUploadActions.ActionTypes.REMOVE_TEMP_PHOTO)
        .map((action: imageUploadActions.RemoveTempPhotoAction) => action.payload)
        .switchMap((photo: string) =>
            this.imageUploadService.removeTempImage(photo)
                .map((pd) => new imageUploadActions.RemoveTempPhotoActionSuccess())
                .catch((ex) => of(new imageUploadActions.RemoveTempPhotoActionFailure(ex)))
        );

    @Effect()
    loadInitialState$: Observable<Action> = this.actions$
        .ofType(imageUploadActions.ActionTypes.LOAD_INITIAL_STATE)
        .startWith(new imageUploadActions.LoadInitialStateAction())
        .switchMap(() => of(new imageUploadActions.LoadInitialStateActionSuccess(``)));

    @Effect()
    removeAllTempIamge$: Observable<Action> = this.actions$
        .ofType(imageUploadActions.ActionTypes.REMOVE_ALL_TEMP_PHOTOS)
        .map((action: imageUploadActions.RemoveAllTempPhotoAction) => action.payload)
        .switchMap((uid: string) =>
            this.imageUploadService.removeAllTempImages(uid)
                .map((pd) => new imageUploadActions.RemoveAllTempPhotoActionSuccess())
                .catch((ex) => of(new imageUploadActions.RemoveAllTempPhotoActionFailure(ex)))
        );
        
    @Effect()
    editImage$: Observable<Action> = this.actions$
        .ofType(imageUploadActions.ActionTypes.CHANGE_PHOTO)
        .map((action: imageUploadActions.ChangePhotoAction) => action.payload)
        .switchMap((payload: any) =>
            this.imageUploadService.changePhoto(payload)
                .map((pd) => new imageUploadActions.ChangePhotoSuccessAction(pd))
                .catch((ex) => of(new imageUploadActions.ChangePhotoFailureAction(ex)))
        );

    constructor(private actions$: Actions, private imageUploadService: ImageUploadService, @Inject('apiBase') private apiBase: string) { }

}
