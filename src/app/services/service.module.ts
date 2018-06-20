import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuard,
        UploadService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [UploadService,
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
