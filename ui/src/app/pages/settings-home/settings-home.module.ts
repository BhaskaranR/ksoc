import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings-home.component';
import { routing } from './settings-home.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    SharedModule,
    routing
  ],
  declarations: [SettingsComponent]
})
export class SettingsHomeModule { }