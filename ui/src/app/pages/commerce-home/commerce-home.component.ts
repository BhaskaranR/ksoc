import { Apollo } from 'apollo-angular';
import { Component, ViewChild, HostBinding, AnimationTransitionEvent, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { animations } from '../animations';
import { Store } from '@ngrx/store';


import * as fromRoot from '../../reducers';

import { Products } from './core/models/products.model';
import * as ProductsActions from './core/actions/products.actions';


import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
    templateUrl: './commerce-home.component.html',
    styleUrls: ['./commerce-home.component.scss'],
    animations: animations
})
export class CommerceHomeComponent implements OnInit {
    private _subscription;

    subscriptions: Subscription[] = [];

    activeTransitionAnimation: boolean;
    fireTransition: string;


    private meIdSubscription: Subscription;
    meid: string;
    activeLinkIndex: number = 2;
    getIfUserSuccess: Subscription;


    currentMedia: string;
    tabLinks = [
        { label: 'Create / Manage Shop', link: 'manageshop' },
    ];

    title = 'Shops-Products';

    seller_products: any
    //token$: Observable<AdminToken>
    testing_object: any

    username: string;

    constructor(
        protected store: Store<fromRoot.AppState>,
        private _media: ObservableMedia,
        private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._media.subscribe((change: MediaChange) => {
            this.currentMedia = change.mqAlias;
        });
    }

    isOver(): boolean {
        return (this.currentMedia == "sm" || this.currentMedia == "xs")
    }


}
