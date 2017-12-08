import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatTabsModule, MatSidenavModule, MatSelectModule, MatInputModule } from '@angular/material';
import { routing } from './business-home.routing';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessHomeComponent } from './business-home.component';
import { FormsModule } from '@angular/forms';
import { PeopleModule } from '../../components/people/index';
import { CommentsModule } from '../../components/comments/index';
import { PostsModule } from '../../components/posts/index';
import { AvatarModule } from '../../components/avatar-image/index';
import { ApolloModule } from 'apollo-angular';
import { BusinessListPageComponent } from './businesslist-page.component';
import { BusinessCoreModule } from '../../business-core';
import { AddBusinessComponent } from '../../business-core/components/add_business/addbusiness';

@NgModule({

    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        CommentsModule,
        CommonModule,
        SharedModule,
        BusinessCoreModule,
        routing,
        SharedModule,
        FormsModule,
        MatTabsModule,
        MatSidenavModule,
        MatSelectModule, 
        MatInputModule 
    ],
    declarations: [
        BusinessHomeComponent,
        BusinessListPageComponent
    ],
    entryComponents: [
        AddBusinessComponent]
})
export class BusinessHomeModule { }
