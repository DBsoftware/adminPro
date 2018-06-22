import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
  constructor(public usuarioSrv: UsuarioService) {
  }
  
  cargarMenu() {
    this.menu = this.usuarioSrv.menu;
  }
}
