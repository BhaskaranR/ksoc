import {
    Component, Input, ChangeDetectionStrategy, Output, EventEmitter, NgZone,
    AfterViewInit, AnimationTransitionEvent
} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Inject } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { animations } from '../../posts/post.animations';
import { postComment } from '../../../core/post-data/post-model';
import { User } from '../../../core/user-data/user-model';
// tslint:disable-next-line:use-life-cycle-interface
@Component({
    selector: 'comment-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css'],
	animations: animations
})
export class CommentItemComponent implements AfterViewInit {
    @Input() 
    item: postComment;

    fireAnimation: boolean;
    prepareAnimation: boolean;
    safeText: SafeHtml;
    timerSub: Subscription;
    timerSub2: Subscription;
    fade: string;

    constructor(private ds: DomSanitizer, 
                private _ngZone: NgZone,  
                @Inject('apiBase') private apiBase: string) {
    }

    ngAfterViewInit() {
    }

    get user() {
       return   {
           _id: this.item.userId, 
           firstName: this.item.userFirstName, 
           lastName: this.item.userLastName, 
           images: { 
               small: this.item.userImgSmall, 
               normal: this.item.userImgNormal 
            } 
        };
    }

 

    get name(): string {
        return `${this.item.userFirstName} ${this.item.userLastName}` ;
    }

    get thumbnailImage(): string{
        return `${this.apiBase}/users/image/${this.item.userImgSmall}`;
    }

    ngOnDestroy() {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
        if (this.timerSub2) {
            this.timerSub2.unsubscribe();
        }
    }
    

    // var textarea = document.querySelector('textarea');
    
    // textarea.addEventListener('keydown', autosize);
                 
    // function autosize(){
    //   var el = this;
    //   setTimeout(function(){
    //     el.style.cssText = 'height:auto; padding:0';
    //     // for box-sizing other than "content-box" use:
    //     // el.style.cssText = '-moz-box-sizing:content-box';
    //     el.style.cssText = 'height:' + el.scrollHeight + 'px';
    //   },0);
    // }
}
