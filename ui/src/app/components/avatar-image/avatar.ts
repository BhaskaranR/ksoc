import { Component, ViewChild, ElementRef, OnInit, Input, Inject, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FileUploader, Headers } from 'ng2-file-upload';
import { PhotoDetails } from '../../core/services/photodetails';
import { UUID } from 'angular2-uuid';
import { FormBuilder } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { Store } from '@ngrx/store';
import * as profileActions from '../../core/profile-data/profile.action';
import * as profileSelector from '../../core/profile-data/profile.selector';
import * as fromRoot from '../../reducers';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../core/user-data/user-model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrls:['./avatar.scss']
})

export class AvatarComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() imageSize: number = 30;
  @Input() background: string = 'blue';
  
  @Input() canEdit: boolean = false;
  @Input() showLetter: boolean = true;
  @Output() onClick = new EventEmitter();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  image$: Subscription;

  image: PhotoDetails;

  get avatarDataCircle() {
    return {
      size: this.imageSize,
      background:this.background,
      fontColor: '#FFFFFF',
      border: '1px solid #d3d3d3',
      isSquare: false,
      fixedColor: true,
      text: this.name
    };
  }

  public constructor(
    @Inject('apiBase') private apiBase: string,
    private store: Store<fromRoot.AppState>,
    private authHttp: AuthHttp) {
  }

  avatarClick(){
    this.onClick.emit({user: this.user});
  }

  get id() {
    return this.user._id;
  }

  get name() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  UploadClick(event: Event) {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    event.preventDefault();
  }

  ngOnInit() {
   /* this.image$ = this.store.select(profileSelector.getMyBgImage).subscribe(image =>
    { debugger;
      this.image = image
    }) */

    let tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      let authHeaders: Headers = { name: 'authorization', value: `Bearer${tokens.access_token}` };
      this.uploader = new FileUploader({ url: `${this.apiBase}/users/image`, headers: [authHeaders], disableMultipart: false });
    }

    this.uploader.onAfterAddingAll = f => {
      this.uploader.uploadAll();
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const resp = JSON.parse(response);
       const image : PhotoDetails= {
        small : resp.images.small,
        normal: resp.images.normal,
        key: resp.images.key,
        large:'',
        xlarge: '',
        ext: resp.images.normal.substring(resp.images.normal.indexOf(".") +1)
      }
      this.store.dispatch(new profileActions.UpdateProfileImageSuccessAction(image));
    };

  }

  openCropper() {
    //todo
  }

  get normalImage() {
    return `${this.user.images.normal}`;
  }

  get thumbnailImage() {
    return `${this.user.images.small}`;
  }

  get largeImage() {
    return `${this.user.images.large}`;
  }

  ngOnDestroy() {
   // this.image$.unsubscribe();
  }

}
