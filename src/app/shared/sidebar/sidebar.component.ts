import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  userAux: Usuario;
  constructor(public sideService: SidebarService, public usrSrv: UsuarioService) { }

  ngOnInit() {
    this.userAux = this.usrSrv.usuario;
    this.sideService.cargarMenu();
  }

}
