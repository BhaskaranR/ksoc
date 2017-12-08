import { Component, ChangeDetectionStrategy, AnimationTransitionEvent } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { animations } from '../animations';

import * as fromRoot from '../../reducers';
import * as fromBusiness from '../../business-core/business-data/business.selector';
import * as businessActions from '../../business-core/business-data/business.action'
import { Business } from '../../business-core/business-data/business.model';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { getMyFollowingBizIds } from '../../core/profile-data/profile.selector';
import { AddBusinessComponent } from '../../business-core/components/add_business/addbusiness';

@Component({
    selector: 'businesslist-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-business-list class="margin_app_list" [viewType]="viewType" [showAddNew]="'true'" [business]="business$ | async" (newBusinessAction)="newBusiness($event)" (businessFollowAction)="businessFollowAction($event)"></app-business-list>
    `,
  styles: [
    `
    .margin_app_list {
        margin: 14px 7px 10px 8px;
    }
    @media screen and (max-width: 1000px) {
        .margin_app_list {
            margin: 10px 0px 0px 0;
        }
    }
    `
    ]
})
export class BusinessListPageComponent {
    activeLinkIndex: number = 1;

    public mediaChange;
    business$: Observable<{ entity: Business, action: string }[]>;


    activeTransitionAnimation: boolean;
    fireTransition: string;

    viewType: number;
    preview: boolean;

    constructor(protected store: Store<fromRoot.AppState>,
        protected dialog: MatDialog,
        private title: Title,
        private route: ActivatedRoute) {

        this.title = route.data['value'].title;
        this.viewType = route.data['value'].type;
    }

    ngOnInit() {
        if (this.viewType === 1) {
            this.store.dispatch(new businessActions.GetAllBusinessAction());
            this.business$ = this.store.select(fromBusiness.getAllBusinessWithAction);
        } 
        else if (this.viewType === 2) {
            this.store.dispatch(new businessActions.GetMyBizFollowingAction())
            this.business$ = this.store.select(fromBusiness.getMyFollowingBusinessWithAction);
        } else if (this.viewType === 3) {
            this.store.dispatch(new businessActions.GetMyBusinessAction());
            this.business$ = this.store.select(fromBusiness.getMyBusinessWithAction);
        }
    }

    dialogRef: MatDialogRef<AddBusinessComponent>;
    lastCloseResult: string;

    newBusiness(event: Event) {
        this.dialogRef = this.dialog.open(AddBusinessComponent, {
            disableClose: false,
            panelClass: 'dialog',
            hasBackdrop: true
        });
        this.dialogRef.afterClosed()
            .filter(result => !!result)
            .subscribe(business => {
                console.log(business);
            });
        event.preventDefault();
    }

    businessFollowAction($event: { id: string, action: string }) {
        if ($event.action === 'Follow') {
            this.store.dispatch(new businessActions.FollowBusinessAction($event.id));
        } else {
            this.store.dispatch(new businessActions.UnFollowBusinessAction($event.id));
        }
    }

}
