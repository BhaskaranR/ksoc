import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatExpansionModule, MatTabsModule, MatIconModule, MatInputModule, MatCardModule, MatAutocompleteModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { routing } from './posts-home.routing';
import { PostsHomeComponent } from './posts-home.component';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostsModule } from '../../components/posts/index';
import { PhotosFilterModule } from '../photo-filter/index';
import { BusinessCoreModule } from '../../business-core';
import { AvatarModule } from '../../components/avatar-image';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { NewPostModule } from '../new-post';
import { Ng2OdometerModule } from 'ng2-odometer';

const components = [
  InviteFriendsComponent
];

@NgModule({
  imports: [
    AvatarModule,
    FlexLayoutModule,
    SharedModule,
    CommonModule,
    PostsModule,
    PhotosFilterModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatTabsModule,
    BusinessCoreModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    NewPostModule,
    MatExpansionModule,
    Ng2OdometerModule,
    routing
  ],
  declarations: [
    PostsHomeComponent, 
    InviteFriendsComponent
  ],
  entryComponents: [
    InviteFriendsComponent]
})
export class PostsHomeModule { }
