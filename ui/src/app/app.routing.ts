import { Routes, RouterModule } from '@angular/router';
import { UnAuthenticatedAuthGuard } from './core/guards/unauthenticated-auth-guard.service';

import { AuthenticatedAuthGuard } from './core/guards/authenticated-auth-guard.service';
import { ProfileExistsGuard } from './core/guards/profile-exists';
import { ErrorComponent } from './pages/session/error/error.component';
import { HomeLayoutComponent } from './pages/home/home.component';
import { GuideViewer } from './pages/guide-viewer/guide-viewer';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
}, {
        path: '',
        component: HomeLayoutComponent, canActivate: [AuthenticatedAuthGuard, ProfileExistsGuard],
        children: [
                {
                        path: 'home', loadChildren: './pages/posts-home/posts-home.module#PostsHomeModule',
                        data: {
                                animation: 'home'
                        }
                },
                {
                        path: 'posts/:id',
                        loadChildren: './pages/post-detailed/post-detailed.module#PostDetailedModule',
                        data: {
                                animation: 'profile'
                        }
                },
                {
                        path: 'profile/:id',
                        loadChildren: './pages/profile-home/profile-home.module#ProfileHomeModule',
                        data: {
                                animation: 'profile'
                        }
                },
                {
                        path: 'biz/:id',
                        loadChildren: './pages/business-page/business-page.module#BusinessPageModule',
                        data: {
                                animation: 'profile'
                        }
                },

                {
                        path: 'people',
                        loadChildren: './pages/people-home/people-home.module#PeopleHomeModule',
                        data: {
                                animation: 'people'
                        }
                },

                {
                        path: 'markets',
                        loadChildren: './pages/commerce-home/commerce-home.module#CommerceHomeModule',
                        data: {
                                animation: 'ecommerce'
                        }
                },
                {
                        path: 'detail/:id', loadChildren: './pages/about-user/about-user.module#AboutUserModule',
                        data: {
                                animation: 'detail'
                        }
                },
                {
                        path: 'detailbiz/:id', loadChildren: './pages/about-biz/about-biz.module#AboutBizModule',
                        data: {
                                animation: 'detail'
                        }
                },
                {
                        path: 'chat',
                        loadChildren: './pages/chat/chat.module#ChatModule',
                        data: {
                                animation: 'chat'
                        }
                },
                {
                        path: 'settings',
                        loadChildren: './pages/settings-home/settings-home.module#SettingsHomeModule'
                },
                {
                        path: 'karmaPoints',
                        loadChildren: './pages/karma-points/karma-points.module#KarmaPointsModule'
                },
                {
                        path: 'business',
                        loadChildren: './pages/business-home/business-home.module#BusinessHomeModule',
                        data: {
                                animation: 'business'
                        }
                }]
}, {
        path: 'login', loadChildren: './pages/ks-home/ks-home.module#KSHomeModule', canActivate: [UnAuthenticatedAuthGuard]
},
{
        path: 'activate/:id', loadChildren: './pages/accountactivation/accountactivation.module#KSActivateAccountModule'
},
{ path: 'guide/:id', component: GuideViewer },

{
        path: 'error',
        component: ErrorComponent
}];

export const routing = RouterModule.forRoot(AppRoutes);

