import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSidenavModule, MatMenuModule, MatIconModule, MatCardModule, MatGridListModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../../../environments/environment';
import { CommerceHomeComponent } from './commerce-home.component';

import { ProductEffects } from './core/effects/products.effects';
import { productsReducer } from './core/reducers/products.reducer';
import { ProductService } from './core/services/product.service';

import { LocalStorageBackend, Storage, StorageBackend } from './core/storage';
import { AvatarModule } from '../../components/avatar-image/index';
import { routing } from './commerce-home.routing';
import { SellersPageComponent } from './sellers/sellers.component';
import { ProductDetailPageComponent } from './product-details/product-details.component';
import { GraphQLModule } from '../../core/apollo.module';


@NgModule({
    declarations: [
        CommerceHomeComponent,
        SellersPageComponent,
        ProductDetailPageComponent
    ],
    imports: [
        HttpModule,
        EffectsModule.forRoot(
            [
                ProductEffects,
            ]
        ),
        FlexLayoutModule,
        AvatarModule,
        CommonModule,
        SharedModule,
        MatCardModule,
        MatDialogModule,
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatGridListModule,
        routing
    ],
    providers: [ProductService, { provide: StorageBackend, useClass: LocalStorageBackend },
        Storage],
})
export class CommerceHomeModule { }