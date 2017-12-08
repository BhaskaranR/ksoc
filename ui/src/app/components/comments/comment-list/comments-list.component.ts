import {Component, Input, Output, ViewChild, ElementRef, SimpleChanges,
	EventEmitter,  trigger, state, style, transition, animate, ChangeDetectionStrategy, ChangeDetectorRef, AnimationTransitionEvent} from '@angular/core';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

import * as siteDataActions from '../../../core/app-data/app.action';
import {  postComment } from '../../../core/post-data/post-model';
import { AppState } from '../../../reducers';
import * as appSelectors from '../../../core/app-data/app.selector';


@Component({
	selector: 'comment-list',
	templateUrl: 'comments-list.component.html',
	styleUrls:['./comments-list.component.css'],

})

export class CommentListComponent{
	@Input() comments: postComment[];
    @Input() isMore: boolean;
    @Output() loadMoreComments = new EventEmitter();
}