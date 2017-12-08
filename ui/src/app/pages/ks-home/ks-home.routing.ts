import { KSHomeComponent } from './ks-home.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgotPassword.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: '', component: KSHomeComponent //,
        /*children: [{
            path: '',
            loadChildren: '../photo-feeds/photo-feeds.module#PhotoFeedsModule',
            data: {
                page: 'TrendingPhotos'
            }
        },
        {
            path: 'videos',
            loadChildren: '../video-feeds/video-feeds.module#VideosFeedsModule',
            data: {
                page: 'TrendingVideos'
            }
        }], */
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    }
]);
