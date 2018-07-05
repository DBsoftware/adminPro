import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuard,
        UploadService,
        ProductoService,
        BlogService,
        VerificaTokenGuard,
        AdminGuard
      } from './service.index';
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
    ModalUploadService,
    ProductoService,
    BlogService,
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
