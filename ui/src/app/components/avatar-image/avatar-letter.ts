import {Component, ElementRef, Input, OnInit, ChangeDetectionStrategy, OnChanges} from '@angular/core';


@Component({
  selector: 'app-avatar-letter',
  template: `
            <div *ngIf="props" color="warn" 
                [style.width] = "props.size" [style.line-height]='props.lineheight' 
                [style.height] = 'props.size' [style.font-size] = 'props.fontSize' 
                [style.border] = 'props.border' [style.border-radius] = 'props.borderradius' 
                [style.text-align] = "props.textalign" style="background: rgba(0,0,0,0.1);"> 
            <div>{{props.letter}}</div>
            </div>
            `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LetterAvatarComponent implements OnInit, OnChanges {

  @Input() data: any;

  letterSrc: string;
  background: string = 'white';
  fontSize: number = 49;
  padding: number = 28;
  letter: string = '?';
  size: number = 100;
  fontColor: string = '#FFFFFF';
  border: string;
  props: Object = null;
  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }
  test() {
    this.generateLetter();
  }

  generateLetter() {
    if (!this.data) {
      throw Error('LetterAvatarDirective configdata not provides');
    }
    if (!this.data.text) {
      this.data.text = '?';
    }
    const size = this.data && this.data.size ? this.data.size : 100;
    this.fontColor = this.data.fontColor ? this.data.fontColor : '#FFFFFF';
    const isSquare = this.data && this.data.isSquare ? true : false;
    const border = this.data && this.data.border ? this.data.border : '1px solid #d3d3d3';
    const background = this.data && this.data.background ? this.data.background : null;
    const text = this.data && this.data.text ? this.data.text : null;
    this.background = background;
    const textArray = text.split(' ');
    let letter = textArray[0].substr(0, 1) + '' + (textArray.length > 1 ? textArray[1].substr(0, 1) : '');
    letter = letter.toUpperCase();
    this.fontSize = (39 * size) / 100;
    this.padding = (28 * size) / 100;
    this.letter = letter;
    this.size = size;
    this.props = new Object();
    this.props['size'] = size+'px';
    this.props['lineheight'] = this.size + 'px';
    this.props['letter'] = letter;
    this.props['fontSize'] = this.fontSize+ 'px';
    if (isSquare) {
      this.props['borderradius'] = '0%';
    } else {
      this.props['borderradius'] = '50%';
    }
    this.props['textalign'] = 'center';
    this.props['border'] = border;
    this.props['background'] = background;
    if (this.data.fixedColor && !background) {
      this.props['background'] = background || this.colorize(letter);
    } else {
      this.props['background'] = background || this.getRandomColor();
    }
    return true;
  };

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  colorize(str) {
    // tslint:disable-next-line:no-var-keyword
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  }

  ngOnInit() {
    this.generateLetter();
  }
  ngOnChanges(...args: any[]) {
    this.generateLetter();
  }
}
