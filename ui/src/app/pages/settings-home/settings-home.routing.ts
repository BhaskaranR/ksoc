import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings-home.component';


const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent
    }
];



export const routing: ModuleWithProviders = RouterModule.forChild(settingsRoutes);
