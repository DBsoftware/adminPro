import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { element } from 'protractor';
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  email: string;
  auth2: any;

  constructor(private router: Router, public _usuarioServ: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.rememberMe = (this.email.length > 1);
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.GSignIn.web.client_id,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( e ) {
    this.auth2.attachClickHandler(e, {},
      googleUser => {
        this._usuarioServ.loginUserGoogle( googleUser.getAuthResponse().id_token )
        .subscribe(() => window.location.href = '#/dashboard');
      }
    );
  }

  in(forma: NgForm) {
    if (forma.invalid) {return; }
    this._usuarioServ.loginUser(new Usuario(
      null,
      forma.value.email,
      forma.value.password
    ), forma.value.rememberMe)
    .subscribe(r => this.router.navigate(['/dashboard']));

  }

}
