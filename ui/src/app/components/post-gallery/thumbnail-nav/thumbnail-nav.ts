import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'thumbnail-nav',
  templateUrl: './thumbnail-nav.html',
  styleUrls: ['./thumbnail-nav.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbNavComponent {

  @Input() state;
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  onNext(){
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}
