import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public usuarioSrv: UsuarioService ) {

  }
  canActivate() {
    return (this.usuarioSrv.usuario.role === 'ADMIN_ROLE') ?
            true
            : this.medidaSeguridad();
  }

  medidaSeguridad() {
    this.usuarioSrv.logOut();
    return false;
  }

}
