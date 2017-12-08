import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatMenuModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutUserComponent } from './about-user.component';
import { Routes, RouterModule } from '@angular/router';
import { AvatarModule } from '../../components/avatar-image/index';
import { ProfileCoreModule } from '../../components/profile-core/index';
import { FileUploadModule } from "ng2-file-upload";

const aboutUserRoutes: Routes = [
    {
        path: '',
        component: AboutUserComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(aboutUserRoutes);


@NgModule({
    imports: [
        FlexLayoutModule,
        SharedModule,
        CommonModule,
        AvatarModule,
        ProfileCoreModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        FileUploadModule,
        MatMenuModule,
        MatListModule,
        routing
    ],
    declarations: [
        AboutUserComponent],
})
export class AboutUserModule { }
