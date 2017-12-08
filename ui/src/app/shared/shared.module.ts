import { GroupByPipe } from '../pipes/groupBy.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTabsModule, MatListModule, MatIconModule, MatProgressBarModule, MatSidenavModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccordionAnchorDirective } from '../components/accordion/accordionanchor.directive';
import { AccordionLinkDirective } from '../components/accordion/accordionlink.directive';
import { AccordionDirective } from '../components/accordion/accordion.directive';
import { MenuItems } from './menu-items/menu-items';
import { RouterModule } from '@angular/router';
import { EllipsisPipe } from '../pipes/ellipsis';
import { NotificationsComponent } from './notifications/notifications.component';
import { HttpModule } from '@angular/http';
import { SideNavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SideNavComponent,
    NotificationsComponent,
    EllipsisPipe,
    GroupByPipe
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SideNavComponent,
    NotificationsComponent,
    EllipsisPipe,
    GroupByPipe
  ],
  providers: [MenuItems]
})
export class SharedModule {

}
