import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule, Router} from '@angular/router';
import {GuideItem, GuideItems} from '../shared/guide-items/guide-items';
import {DocViewerModule} from '../shared/doc-viewer/doc-viewer-module';
import {TableOfContentsModule} from '../shared/table-of-contents/table-of-contents.module';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'guide-viewer',
  templateUrl: './guide-viewer.html',
  styleUrls: ['./guide-viewer.scss'],
})
export class GuideViewer implements OnInit {
  guide: GuideItem;
  showSettings : boolean;
  constructor(private _route: ActivatedRoute,
              private router: Router,
              public guideItems: GuideItems) {
    _route.params.subscribe(p => {
      this.guide = guideItems.getItemById(p['id']);

      if (!this.guide) {
        this.router.navigate(['/guides']);
      }
    });
  }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [DocViewerModule, FlexLayoutModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, RouterModule, TableOfContentsModule],
  exports: [GuideViewer],
  declarations: [GuideViewer],
  providers: [GuideItems],
})
export class GuideViewerModule {}
