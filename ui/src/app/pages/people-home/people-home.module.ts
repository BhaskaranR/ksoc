import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatTabsModule, MatSidenavModule } from '@angular/material';
import { PeopleComponent } from './people-home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { PeopleModule } from '../../components/people';

const peopleRoutes: Routes = [
    {
        path: '',
        component: PeopleComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(peopleRoutes);

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    CommonModule ,
    routing,
    PeopleModule,
    MatTabsModule,
    MatSidenavModule
  ],
  declarations: [PeopleComponent]
})
export class PeopleHomeModule { }
