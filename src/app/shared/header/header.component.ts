import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  userAux: Usuario;
  constructor(public usrSrv: UsuarioService) { }

  ngOnInit() {
    this.userAux = this.usrSrv.usuario;
  }

}
