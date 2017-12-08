import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { User, UserAction } from '../../../core/user-data/user-model';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../reducers';
import { Subscription } from 'rxjs/Subscription';
import { Business } from '../../../business-core/business-data/business.model';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent {

  @Input()
  business: Business[];

  @Input()
  viewType: number;

  @Input()
  showAddNew: boolean = false;

  @Output()
  businessFollowAction = new EventEmitter<{ id: string, action: string }>();

  @Output()
  newBusinessAction = new EventEmitter();

  cardAction($event: { id: string, action: string }) {
    this.businessFollowAction.emit($event);
  }

  newBusiness(event: Event) {
    this.newBusinessAction.emit(event);
  }
}