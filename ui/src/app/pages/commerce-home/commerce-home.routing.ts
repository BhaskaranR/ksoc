
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CommerceHomeComponent } from './commerce-home.component';
import { SellersPageComponent } from './sellers/sellers.component';
import { ProductDetailPageComponent } from './product-details/product-details.component';

const commerceRoutes: Routes = [
    {
        path: '',
        component: CommerceHomeComponent,
        children: [
            { path: '', redirectTo: 'sellers', pathMatch: 'full' },
            {
                path: 'sellers',
                component: SellersPageComponent
            },
            {
                path: 'product/:id',
                component: ProductDetailPageComponent
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(commerceRoutes);


