import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule, MatDialogModule, MatSidenavModule } from '@angular/material';
import { routing } from './ks-home.routing';
import { KSHomeComponent } from './ks-home.component';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgotPassword.component';
import { SetNewPasswordComponent } from './set-new-password/setNewPassword.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParallaxModule } from '../../components/parallax/parallax.module';
import {  Footer } from '../shared/footer/footer';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        ParallaxModule,
        routing
    ],
    declarations: [
        KSHomeComponent,
        Footer,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        SetNewPasswordComponent
    ],
    entryComponents:[
        LoginComponent,
        RegisterComponent
    ]
})
export class KSHomeModule {

}
