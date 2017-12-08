import { Component, Inject, Renderer, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FileUploader, Headers } from 'ng2-file-upload';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthHttp } from 'angular2-jwt';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../../reducers';
import * as postActions from '../../../core/post-data/post.action';
// import * as imageUploadActions from '../../../core/imageupload-data/imageupload.action';
// import * as imageSelector from '../../../core/imageupload-data/imageupload.selector';
import * as profileSelector from '../../../core/profile-data/profile.selector';

import { User } from '../../../core/user-data/user-model';
import { PhotoDetails } from '../../../core/services/photodetails';
import { Post } from '../../../core/post-data/post-model';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'new-comment',
  templateUrl: './newcomment.component.html',
  styleUrls: ['./newcomment.component.css']
})
export class NewCommentComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;
  private uuid: string;
  form: FormGroup;
  imagePreviewThumbnail$: Observable<{ image: string, loading: boolean}[]>;
  photosPath: string;
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input()
  post: Post;

  @Input()
  user: User;

  @Input()
  touch : boolean = false;

  public openPopup: Function;

  public constructor(
    @Inject('apiBase') private apiBase: string,
    private formBuilder: FormBuilder,
    private authHttp: AuthHttp,
    private elementRef:ElementRef,
    private store: Store<fromRoot.AppState>) {
      // var textarea = elementRef.nativeElement.querySelector('textarea');
      // document.addEventListener('keydown', autosize);          
      // function autosize(){
      //   var el = this;
      //   setTimeout(function(){
      //     el.style.cssText = 'height:auto; padding:0';
      //     el.style.cssText = 'height:' + el.scrollHeight + 'px';
      //   },0);
      // }
  }

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

  ngOnInit() {

   // this.imagePreviewThumbnail$ = this.store.select(imageSelector.getImageUploadThumbNails);

    let tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      let authHeaders: Headers = { name: 'Authorization', value: `Bearer${tokens.access_token}` };
      this.uploader = new FileUploader({ url: `${this.apiBase}/posts/new/file`, headers: [authHeaders], disableMultipart: false });
    }
    /*this.uploader.onAfterAddingAll = f => {
      this.uploader.uploadAll();
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const resp: PhotoDetails = JSON.parse(response);
      this.store.dispatch(new imageUploadActions.UploadTempPhotoActionSuccess([resp]));
    };
    */
    this.uuid = UUID.UUID();
    this.form = this.formBuilder.group({
      text: [''],
    });
    this.uploader.onBuildItemForm = (fileItem: any, frm: any) => {
      frm.append('clientId', this.uuid);
    };
  }

  UploadClick(event: Event) {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    event.preventDefault();
  }


//  removePhoto(photo: string) {
//    this.store.dispatch(new imageUploadActions.RemoveTempPhotoAction(photo));
//  }

    public eventMock;
  public eventPosMock;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  public toggled = false;
  public content = 'Add a comment';


  onSubmit(event: Event) {
    if (this.form.valid) {
      let formObject = Object.assign(this.form.value, { 'clientId': this.uuid, 'postId': this.post._id });
      this.store.dispatch(new postActions.CommentAction(formObject));
    }
    event.preventDefault();
  }
}
