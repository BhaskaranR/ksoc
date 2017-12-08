import 'hammerjs';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './pages/session/error/error.component';
import { routing } from './app.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NotFoundComponent } from './pages/session/not-found/not-found.component';
import { WebPushService } from './webpush.service';
import { WindowRef } from './window-ref';
import { Ng2OdometerModule } from 'ng2-odometer';
import { AvatarModule } from './components/avatar-image/index';
import { RecordRTCComponent } from './pages/record-rtc/record-rtc.component';
import { HomeLayoutComponent } from './pages/home/home.component';
import { MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { GuideViewerModule } from './pages/guide-viewer/guide-viewer';

@NgModule({
    imports: [
        ScrollDispatchModule,
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        AvatarModule,
        SharedModule,
        CoreModule,
        GuideViewerModule,
        ServiceWorkerModule,
        Ng2OdometerModule.forRoot(),
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatCheckboxModule,
        routing
    ],
    declarations: [
        NotFoundComponent,
        ErrorComponent,
        AppComponent,
        HomeLayoutComponent,
        RecordRTCComponent
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        },
        {
            provide: 'apiBase',
            useValue: environment.apiBaseUrl
        },
        {
            provide: 'userStorageName',
            useValue: 'userinfo'
        },
        WebPushService,
        WindowRef
    ],
    entryComponents: [RecordRTCComponent],
    bootstrap: [AppComponent],

})
export class AppModule {
}
