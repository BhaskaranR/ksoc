import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { KarmaPointsComponent } from './karma-points.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatTabsModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule, MatSelectModule } from '@angular/material';

const settingsRoutes: Routes = [
  {
      path: '',
      component: KarmaPointsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(settingsRoutes);


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
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    SharedModule,
    ChartsModule,
    routing
  ],
  declarations: [KarmaPointsComponent]
})
export class KarmaPointsModule { }
