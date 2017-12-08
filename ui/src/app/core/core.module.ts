import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthenticatedAuthGuard} from './guards/authenticated-auth-guard.service';
import {Title} from '@angular/platform-browser';
import {LocalStorageBackend, Storage, StorageBackend} from './storage';
import {AuthGuard} from './guards/auth-guard.service';
import { UnAuthenticatedAuthGuard } from './guards/unauthenticated-auth-guard.service';
import { PostService } from './post-data/post.service';
import { PostEffects } from './post-data/post.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './user-data/user.service';
import { ProfileEffects } from './profile-data/profile.effect';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


import { DBModule } from '@ngrx/db';

import { schema } from './db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProfileExistsGuard } from './guards/profile-exists';
import { UserEffects } from './user-data/user.effect';
import { authProvider } from './services/auth-factory';
import { AuthActions } from './auth-data/auth.action';
import { TokenService } from './token-data/token.service';
import { AccountService } from './auth-data/auth.service';
import { TokenEffects } from './token-data/token.effect';
import { environment } from '../../environments/environment';
import { GraphQLModule } from './apollo.module';

@NgModule({
    imports: [
        StoreRouterConnectingModule,
        GraphQLModule,
        EffectsModule.forRoot([PostEffects,
            TokenEffects,
            ProfileEffects,
            UserEffects
        ]),
        StoreModule.forRoot(reducers),
        DBModule.provideDB(schema),
    ],
    providers: [
        AuthActions,
        TokenService,
        AccountService,
        UserService,
        PostService,
        AuthenticatedAuthGuard,
        UnAuthenticatedAuthGuard,
        ProfileExistsGuard,
        Title,
        AuthGuard,
        { provide: StorageBackend, useClass: LocalStorageBackend },
        Storage,
        authProvider
    ]
}) 
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
