import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const Proutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'account-settings', component: AccountSettingsComponent },
        { path: 'graficas1', component: Graficas1Component },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(Proutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
