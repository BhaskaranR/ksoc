import { Apollo } from 'apollo-angular';
import { Component, ViewChild, HostBinding, AnimationTransitionEvent, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { animations } from '../../animations';
import { Store } from '@ngrx/store';

import * as siteDataActions from '../../../core/app-data/app.action';

import * as fromRoot from '../../../reducers';
import * as appActions from '../../../core/app-data/app.action';
import * as appSelector from '../../../core/app-data/app.selector';
import * as fromApp from '../../../core/app-data/app.selector';

import { Products } from './../core/models/products.model';
import * as ProductsActions from './../core/actions/products.actions';
import { ProductService } from '../core/services/product.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    animations: animations
})

export class ProductDetailPageComponent implements OnInit, OnDestroy {
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

    actionsSubscription: Subscription;

    product$:any;
    productId: any;
    username: string;
    title = 'Product-Details';

    constructor(
        private productService: ProductService,
        protected store: Store<fromRoot.AppState>,
        private _media: ObservableMedia,
        private router: Router, private activatedRoute: ActivatedRoute) {
        store.select(fromApp.getSideNavState).subscribe(isSideNavOpen => {
            this.isOpen = isSideNavOpen;
        });

        this.actionsSubscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.productId = params['sku'];
                console.log('Details page');
                console.log(this.productId);
                  this.productService
                    .getProductDetails(this.productId)
                    .subscribe(response => this.product$ = response);
            }
        );
    }
    ngOnInit() {
        this._media.subscribe((change: MediaChange) => {
            this.currentMedia = change.mqAlias;
        });
    }

    isOver(): boolean {
        return (this.currentMedia == "sm" || this.currentMedia == "xs")
    }

    animationDone($event: AnimationTransitionEvent) {
        if ($event.fromState !== 'void') {
            if ($event.toState === 'in') {
                this.store.dispatch(new siteDataActions.SetTransitionAction(false));
            }
            else if ($event.toState === 'out') {
                this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
            }
        }
    }

    ngOnDestroy() {
        //this.store.dispatch(new postActions.ClearPostStoreAction());
    }

}