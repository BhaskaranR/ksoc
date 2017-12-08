import { Component, Input, Inject, EventEmitter, Output } from '@angular/core';
import { Business } from '../../business-data/business.model';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']

})
export class BusinessCardComponent {

  @Input()
  business: Business;

  @Input() canOpenProfile: boolean = true;

  @Input() viewType: string;

  @Input() actionType = 'Follow';

  @Output() cardAction = new EventEmitter();

  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1}`);
  selectedAvatar = this.avatars[2];

  constructor( @Inject('apiBase') private apiBase: string) { }

  get thumbnail(): string | boolean {
    if (this.business.images && this.business.images.small && this.business.images.small !== '') {
      return `${this.business.images.small}`;
    }
    return false;
  }

  action($event) {
    this.cardAction.emit({id: this.business._id, action: this.actionType});
  }

  canAction(){
    return this.viewType != '3';
  }
}
