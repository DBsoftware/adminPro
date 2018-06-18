import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private usrServ: UsuarioService, private rter: Router) {}
  canActivate(): boolean {
    if (this.usrServ.isLogIn()) {return true;
    } else {this.rter.navigate(['/login']); return false; }
  }
}
