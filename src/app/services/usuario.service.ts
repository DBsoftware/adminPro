import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';
import { throwError } from 'rxjs';
const swal: SweetAlert = _swal as any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string;
  usuario: Usuario;
  menu: any[] = [];
  constructor( public http: HttpClient,
              public router: Router,
              public archSrv: UploadService) {
              this.cargarDeAlmacenamiento();
              }
//  ==========================================
//  ==========LOGIN===========================
//  ==========================================
  isLogIn() {
    return localStorage.getItem('token') != null ? localStorage.getItem('token').length >  20 : false ;
  }


  loginUser(usuario: Usuario, recordar: boolean) {

    (recordar) ?
    localStorage.setItem('email', usuario.email) :
    localStorage.removeItem('email');

    return this.http.post(`${URL_SERVICIOS}/login`, usuario)
                          .pipe(
                            map((r: any) =>  this.almacenarLocalmente(r)),
                            catchError(err => {
                              swal('Credenciales incorrectas', '', 'error');
                              return throwError(err);
                            })
                          );
                        }

  loginUserGoogle(token: string) {
    return this.http.post(`${URL_SERVICIOS}/login/google`, {token})
                          .pipe(map((r: any) =>  this.almacenarLocalmente(r)));
  }

  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.token = '';
    this.usuario = null;
    this.menu = [];
    this.router.navigate(['/login']);
  }
//  ==========================================
//  ==========Almacenamiento==================
//  ==========================================
  almacenarLocalmente(rsp: any ) {
    localStorage.setItem('id', rsp.aux._id);
    localStorage.setItem('token', rsp.token);
    localStorage.setItem('usuario', JSON.stringify(rsp.aux));
    localStorage.setItem('menu', JSON.stringify(rsp.menu));
    this.token = rsp.token;
    this.usuario = rsp.aux;
    this.menu = rsp.menu;
    return true;
  }

  almacenarLocalmenteUpdate(rsp: any ) {
    if (rsp._id === this.usuario._id) {
      localStorage.setItem('usuario', JSON.stringify(rsp.aux));
    }
    this.usuario = rsp.aux;
    return rsp;
  }

  cargarDeAlmacenamiento() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }




//  ==========================================
//  ==========CRUD============================
//  ==========================================

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${URL_SERVICIOS}/usuarios`, usuario)
    .pipe(map((r: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return r.usuario;
    }),
    catchError(err => {
      swal(err.error.msn, err.error.err.message.split(':')[2], 'error');
      return throwError(err);
    })
  );
  }

  actualizarUsuario(usuario: Usuario, obj? ) {
    return this.http.put(`${URL_SERVICIOS}/usuarios/${usuario._id}?token=${localStorage.getItem('token')}`, (obj) ? obj : usuario)
    .pipe(map((r: any) =>  {
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return this.almacenarLocalmenteUpdate(r);
    }),
    catchError(err => {
      swal(err.error.msn, err.error.err.message.split(':')[2], 'error');
      return throwError(err);
    })
  );
  }

  cargarUsuarios(desde: number = 0 ) {
    return this.http.get(`${URL_SERVICIOS}/usuarios?desde=${desde}&limite=5`);
  }
  deleteUser(id: any) {
    return this.http.delete(`${URL_SERVICIOS}/usuarios/${id}?token=${localStorage.getItem('token')}`)
    .pipe(map((r: any) => {
      swal('Operación exitosa', 'El usuario ha sido eliminado del sistema', 'success');
      return true;
    }));
  }
//  ==========================================
//  ==========Utils===========================
//  ==========================================
  cambiarImagen(file: File, id: string) {
    this.archSrv.upload(file, 'usuarios', id)
                .then((resp: any) => {
                  this.usuario.img = resp.aux.img;
                  swal('La imagen fue guardada', this.usuario.nombre, 'success');
                  this.almacenarLocalmenteUpdate(resp);
                })
                .catch(resp => console.log(resp));
  }

  buscarUsuario(t: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/usuarios/${t}`)
                    .pipe(map((r: any) => r.aux));
  }

}
