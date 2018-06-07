import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages.routes';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';


@NgModule({
    declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [SharedModule, PagesRoutingModule]
})

export class PagesModule {}
