import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MatSidenavModule, MatCardModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';

const peopleRoutes: Routes = [
    {
        path: '',
        component: ChatComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(peopleRoutes);

@NgModule({
  imports: [
    FlexLayoutModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    CommonModule ,
    routing
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
