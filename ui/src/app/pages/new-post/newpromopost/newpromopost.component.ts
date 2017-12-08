import { Component, Inject, Renderer, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FileUploader, Headers } from 'ng2-file-upload';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'


import * as fromRoot from '../../../reducers';
import * as postActions from '../../../core/post-data/post.action';
import * as businessActions from '../../../business-core/business-data/business.action'
import * as imageUploadActions from '../imageupload-data/imageupload.action';
import * as imageSelector from '../imageupload-data/imageupload.selector';
import * as profileSelector from '../../../core/profile-data/profile.selector';
import * as businessSelector from '../../../business-core/business-data/business.selector';
import { User, UserGroup } from '../../../core/user-data/user-model';
import { PhotoDetails } from '../../../core/services/photodetails';
import { imagesQuery } from '../../../core/post-data/post.query';
import { UserGroupListComponent } from '../usergroup/usergroup-list.component';

@Component({
    templateUrl: './newpromopost.component.html',
    styleUrls: ['./newpromopost.component.scss']
})
export class NewPromoPostComponent implements OnInit, OnDestroy {
    uploader: FileUploader;
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;
    private uuid: string;
    form: FormGroup;
    imagePreviewThumbnail: { image: string, loading: boolean }[];
    imagePreviewSubscription: Subscription;
    photosPath: string;
    preference: string = "public";
    //@ViewChild('fileInput') fileInput: ElementRef;

    user$: Observable<User>;

    public userGrp: UserGroup[] = [];
    private selectedPage: UserGroup;


    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
   // stateStep2: StepState = StepState.Required;
   // stateStep3: StepState = StepState.Complete;
    disabled: boolean = false;

    //toggleRequiredStep2(): void {
    //    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
   // }

   // toggleCompleteStep3(): void {
   //     this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
   // }

   items = [
    {value: 'demo1', viewValue: 'Demo-1'},
    {value: 'demo2', viewValue: 'Demo-2'}
  ];

    activeStep1Event(): void {
        this.activeDeactiveStep1Msg = 'Active event emitted.';
    }

    deactiveStep1Event(): void {
        this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    }

    //change(event: IStepChangeEvent): void {
    //};

    public constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<NewPromoPostComponent>,
        @Inject('apiBase') private apiBase: string,
        private formBuilder: FormBuilder,
        private authHttp: AuthHttp,
        private store: Store<fromRoot.AppState>) {
    }


    ngOnInit() {
        this.user$ = this.store.select(profileSelector.getMe);

        this.store.select(businessSelector.getMyBizGroupWithSettings).subscribe(bgrp => {
            this.userGrp = bgrp;
        })
        //this.imagePreviewSubscription = this.store.select(imageSelector.getImageUploadThumbNails).subscribe(thumbnails => this.imagePreviewThumbnail = thumbnails
        //)

        let tokens = JSON.parse(localStorage.getItem('tokens'));
        if (tokens) {
            let authHeaders: Headers = { name: 'Authorization', value: `Bearer${tokens.access_token}` };
            this.uploader = new FileUploader({ url: `${this.apiBase}/posts/new/file`, headers: [authHeaders], disableMultipart: false });
        }
        this.uploader.onAfterAddingAll = f => {
            this.store.dispatch(new imageUploadActions.UploadTempPhotoAction(f));
            this.uploader.uploadAll();
        };
        this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
            const resp: PhotoDetails = JSON.parse(response);
            this.store.dispatch(new imageUploadActions.UploadTempPhotoActionSuccess([resp]));
        };
        this.uuid = UUID.UUID();
        this.form = this.formBuilder.group({
            text: [''],
        });
        this.uploader.onBuildItemForm = (fileItem: any, frm: any) => {
            frm.append('clientId', this.uuid);
        };
    }

    UploadClick(event: Event) {
        //   this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
        event.preventDefault();
    }

  

    removePhoto(photo: string) {
        this.store.dispatch(new imageUploadActions.RemoveTempPhotoAction(photo));
    }

    // TODO Remove from server Later..
    close(event: Event) {
        this.store.dispatch(new imageUploadActions.RemoveAllTempPhotoAction(this.uuid));
        this.dialogRef.close();
        event.preventDefault();
    }

    ngOnDestroy() {
        this.imagePreviewSubscription.unsubscribe();
    }



    onSubmit(event: Event) {
        if (this.form.valid) {
            if (this.selectedPage) {
                let formObject = Object.assign(this.form.value, { 'clientId': this.uuid });
                this.store.dispatch(new postActions.PostAction(formObject));
            }
            else {
                let formObject = Object.assign(this.form.value, { 'clientId': this.uuid });

                this.store.dispatch(new postActions.PostAction(formObject));
            }
            this.close(event);
        }
        event.preventDefault();
    }
}


