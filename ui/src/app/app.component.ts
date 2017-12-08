import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
  <router-outlet></router-outlet>
`
})
export class AppComponent implements OnInit {

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer
    ) {

        const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('/assets/emojis/SVG/allemoji.svg');
        iconRegistry.addSvgIconSetInNamespace('emojis', avatarsSafeUrl);
    }

    ngOnInit(): void {
    }
}
