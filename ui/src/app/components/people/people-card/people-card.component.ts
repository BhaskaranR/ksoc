import { Component, Input, Inject, EventEmitter, Output } from '@angular/core';
import { User } from '../../../core/user-data/user-model';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls : ['./people-card.component.css']
})
export class PeopleCardComponent {

  @Input()
  user: User;

  @Input() canOpenProfile: boolean = true;

  @Input() imageSize: number = 70;

  @Input() preview: boolean;

  @Input() showAction: boolean = true;

  @Output() cardAction = new EventEmitter();

  @Input()
  actionType = 'Follow';

  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1}`);
  selectedAvatar = this.avatars[2];

  constructor( @Inject('apiBase') private apiBase: string) { }

  get avatarDataCircle() {
    return {
      size: this.imageSize,
      fontColor: '#FFFFFF',
      border: '2px solid #d3d3d3',
      isSquare: false,
      text: this.name
    };
  }


  get name() {
    if (this.user.firstName && this.user.lastName) {
      return `${this.user.firstName} ${this.user.lastName}`;
    } else if (!this.user.firstName && this.user.lastName) {
      return ` ${this.user.lastName}`;
    } else {
      return ` ${this.user.firstName}`;
    }
  }

  get thumbnail(): string | boolean {
    if (this.user.images && this.user.images.small && this.user.images.small !== '') {
      return `${this.user.images.small}`;
    }
    return false;
  }

  action($event) {
    this.cardAction.emit({id: this.user._id, action: this.actionType});
    $event.stopPropogation();
  }
}
