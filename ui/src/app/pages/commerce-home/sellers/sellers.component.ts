import { Apollo } from 'apollo-angular';
import { Component, ViewChild, HostBinding, AnimationTransitionEvent, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import * as siteDataActions from '../../../core/app-data/app.action';

import * as fromRoot from '../../../reducers';
import * as appActions from '../../../core/app-data/app.action';
import * as appSelector from '../../../core/app-data/app.selector';

import { Products } from '../core/models/products.model';
import * as ProductsActions from '../core/actions/products.actions';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { getSideNavState } from '../../../core/app-data/app.selector';


@Component({
    templateUrl: './sellers.component.html',
    styleUrls: ['./sellers.component.scss']
})
export class SellersPageComponent implements OnInit, OnDestroy {
    private _subscription;

    subscriptions: Subscription[] = [];

    activeTransitionAnimation: boolean;
    fireTransition: string;


    private meIdSubscription: Subscription;
    meid: string;
    activeLinkIndex: number = 2;
    isOpen: boolean;
    getIfUserSuccess: Subscription;


    currentMedia: string;
    tabLinks = [
        { label: 'Create / Manage Shop', link: 'manageshop' },
    ];

    title = 'Shops-Products';

    seller_products: any
    //token$: Observable<AdminToken>
    testing_object:any

    username: string;

    constructor(
        protected store: Store<fromRoot.AppState>,
        private _media: ObservableMedia,
        private router: Router, private activatedRoute: ActivatedRoute) {
        store.select(getSideNavState).subscribe(isSideNavOpen => {
            this.isOpen = isSideNavOpen;
        });
    }

    ngOnInit() {
        this._media.subscribe((change: MediaChange) => {
            this.currentMedia = change.mqAlias;
        });
        this.store.dispatch(
            new ProductsActions.LoadAllProductsRequestedAction()
        );
        this.seller_products = this.store.select('products');

        this.testing_object = 
        [
            {
                "shopTitle": "JCWebAccess Floral Shop",
                "profileurl": "jcwebaccess",
                "sellerIcon": "http://dev.ecommerce.com/pub/media/mpapi/avatar/150x150/floral.jpg",
                "sellerProductCount": 7,
                "list": [
                    {
                        "proid": "1",
                        "proname": "Joust Duffle Bag",
                        "protype": "simple",
                        "price": "34.0000",
                        "sku": "24-MB01",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": "2",
                        "proname": "Strive Shoulder Pack",
                        "protype": "simple",
                        "price": "32.0000",
                        "sku": "24-MB04",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": "3",
                        "proname": "Crown Summit Backpack",
                        "protype": "simple",
                        "price": "38.0000",
                        "sku": "24-MB03",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": "4",
                        "proname": "Wayfarer Messenger Bag",
                        "protype": "simple",
                        "price": "45.0000",
                        "sku": "24-MB05",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": "5",
                        "proname": "Rival Field Messenger",
                        "protype": "simple",
                        "price": "45.0000",
                        "sku": "24-MB06",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    }
                ]
            },
            {
                "shopTitle": "siva valluri",
                "profileurl": "valluri",
                "sellerIcon": "http://dev.ecommerce.com/pub/media/mpapi/avatar/150x150/noimage.png",
                "sellerProductCount": 1,
                "list": [
                    {
                        "proid": "2047",
                        "proname": "New Fashion Women Synthetic Leather Casual Bow Shoulder Bag",
                        "protype": "virtual",
                        "price": "11.5000",
                        "sku": "123182997",
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": null,
                        "proname": null,
                        "protype": null,
                        "price": null,
                        "sku": null,
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": null,
                        "proname": null,
                        "protype": null,
                        "price": null,
                        "sku": null,
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": null,
                        "proname": null,
                        "protype": null,
                        "price": null,
                        "sku": null,
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    },
                    {
                        "proid": null,
                        "proname": null,
                        "protype": null,
                        "price": null,
                        "sku": null,
                        "prothumbnail": "http://dev.ecommerce.com/pub/static/version1505345000/webapi_rest/_view/en_US/Magento_Catalog/images/product/placeholder/.jpg"
                    }
                ]
            }
        ]

    }

    isOver(): boolean {
        return (this.currentMedia == "sm" || this.currentMedia == "xs")
    }

    addToCart() {

        this.router.navigate(['/markets/product', "asdf"], { relativeTo: this.activatedRoute.root });
    }

    ngOnDestroy() {
    }

}
