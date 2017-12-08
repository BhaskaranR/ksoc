import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessCoreModule } from '../../business-core';
import { PostsModule } from '../../components/posts';
import { CommentsModule } from '../../components/comments';
import { PeopleModule } from '../../components/people';
import { AvatarModule } from '../../components/avatar-image/index';
import { BusinessPageComponent } from './business-page.component';
import { NewPostModule } from '../new-post/index';
import { MatButtonModule, MatCardModule, MatTabsModule, MatIconModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatButtonToggleModule } from '@angular/material';
import { ParallaxModule } from '../../components/parallax/parallax.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';

const bizpageRoutes: Routes = [
    {
        path: '',
        component: BusinessPageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(bizpageRoutes);

@NgModule({
    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        CommentsModule,
        CommonModule,
        SharedModule,
        PeopleModule,
        NewPostModule,
        MatToolbarModule,
        MatButtonToggleModule,
        ParallaxModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU&callback=myMap'}),
        routing
    ],
    declarations: [
        BusinessPageComponent]
})
export class BusinessPageModule { }
