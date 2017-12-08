import { PostsModule } from '../../components/posts';
import { PhotosModule } from '../../components/photos';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatButtonModule, MatIconModule } from '@angular/material';
import { PostDetailPopupComponent } from './post-detail-popup.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    PhotosModule,
    MatButtonModule,
    MatIconModule,
    PostsModule
  ],
  declarations: [ PostDetailPopupComponent],
  exports : [PostDetailPopupComponent],
  entryComponents: [PostDetailPopupComponent]
})
export class PostDetailedPopupModule { }
