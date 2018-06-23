import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}
  canActivate() {
    const tiempoExp = JSON.parse(atob(this.usuarioService.token.split('.')[1])).ext;
    return this.expirado( tiempoExp )
    ? this.toLogin() : this.renovar( tiempoExp ) ;
  }

  expirado(ext: number) {
    return (ext < (new Date().getTime() / 1000));
  }

  renovar(ext: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
          const ahora = new Date();
          ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));
          (new Date(ext * 1000).getTime() > ahora.getTime()) ?
          resolve(true) : 
          this.usuarioService.renovarToken()
          .subscribe(() => resolve(true), () => reject(this.toLogin()));
    });
  }

  toLogin() {
    this.usuarioService.logOut();
    this.router.navigate(['/login']);
    return false;
  }
}
