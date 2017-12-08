import { PostsModule } from '../../components/posts';
import { PhotosModule } from '../../components/photos';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailedComponent } from './post-detailed.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

const postdetailedRoutes: Routes = [
    {
        path: '',
        component: PostDetailedComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(postdetailedRoutes);

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FlexLayoutModule,
    PhotosModule,
    MatButtonModule,
    MatIconModule,
    PostsModule
  ],
  declarations: [PostDetailedComponent],
})
export class PostDetailedModule { }
