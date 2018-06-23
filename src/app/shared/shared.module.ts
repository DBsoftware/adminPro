import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';




@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        ModalUploadComponent,
        SidebarComponent,
        BreadcrumbsComponent
        ],
        exports: [
            NopagefoundComponent,
            HeaderComponent,
            ModalUploadComponent,
            SidebarComponent,
            BreadcrumbsComponent
        ]
})

export class SharedModule {}
