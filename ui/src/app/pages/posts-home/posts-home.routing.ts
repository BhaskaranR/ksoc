import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PostsHomeComponent } from './posts-home.component';

const postRoutes: Routes = [
    {
        path: '',
        component: PostsHomeComponent,
        children: [
            {path: '', redirectTo: 'featured', pathMatch: 'full'},
            {
                path: 'featured',
                loadChildren: '../feature-feeds/feature-feeds.module#FeatureFeedsModule',
                data: {
                    animation: 'profile'
                }
            },
            {
                path: 'photos',
                loadChildren: '../photo-feeds/photo-feeds.module#PhotoFeedsModule',
                data: {
                    page: 'Gallery',
                    animation: 'profile'
                }
            },
            {
                path: 'videos',
                loadChildren: '../video-feeds/video-feeds.module#VideosFeedsModule',
                data: {
                    animation: 'profile'
                }
            },
            {
                path: 'fun',
                loadChildren: '../feature-feeds/feature-feeds.module#FeatureFeedsModule',
                data: {
                    animation: 'profile'
                }
            },
            {
                path: 'learn',
                loadChildren: '../feature-feeds/feature-feeds.module#FeatureFeedsModule',
                data: {
                    animation: 'profile'
                }
            },
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(postRoutes);
