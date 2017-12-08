import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatCardModule, MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutBizComponent } from './about-biz';
import { Routes, RouterModule } from '@angular/router';
import { AvatarModule } from '../../components/avatar-image/index';
import { ProfileCoreModule } from '../../components/profile-core/index';

const aboutBizRoutes: Routes = [
    {
        path: '',
        component: AboutBizComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(aboutBizRoutes);


@NgModule({
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        MatLineModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        SharedModule,
        CommonModule,
        AvatarModule,
        ProfileCoreModule,
        routing
    ],
    declarations: [
        AboutBizComponent]
})
export class AboutBizModule { }
