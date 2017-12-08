import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSelectModule, MatMenuModule, MatToolbarModule, MatInputModule, MatStepperModule, MatButtonModule, MatIconModule, MatAutocompleteModule, MatCardModule, MatTabsModule, MatSidenavModule, MatCheckboxModule } from '@angular/material';
import { AddBusinessComponent } from './components/add_business/addbusiness';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { MatSliderModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessMapComponent } from './components/business-map/business-map.component';
import { AvatarModule } from '../components/avatar-image/index';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BusinessEffects } from './business-data/business.effect';
import { BusinessService } from './business-data/business.service';
import { StoreModule } from '@ngrx/store';
import { businessReducer } from './business-data';

const components = [
  AddBusinessComponent,
  BusinessListComponent,
  BusinessCardComponent,
  BusinessMapComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    FlexLayoutModule,
    AvatarModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    }),
    MatSliderModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatStepperModule,
    MatAutocompleteModule,
    StoreModule.forFeature('business', businessReducer),
    EffectsModule.forFeature([BusinessEffects])
  ],
  declarations: components,
  exports: components,
  providers: [
    BusinessService
  ],
  entryComponents:[AddBusinessComponent]

})
export class BusinessCoreModule { }
