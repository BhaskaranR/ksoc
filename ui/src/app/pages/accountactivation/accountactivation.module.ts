import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { AccountActivationComponent } from './accountactivation.component';

const accRoutes: Routes = [
    {
        path: '',
        component: AccountActivationComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(accRoutes);


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        routing
    ],
    declarations: [
        AccountActivationComponent
    ]
})
export class KSActivateAccountModule {

}
