import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function init_plugins();
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService,
                public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    },
    {validators: this.sonIguales('password', 'password2')}
  );

  this.forma.setValue({
    nombre: 'Fake',
    email: 'Fake@gmail.com',
    password: '123456',
    password2: '123456',
    condiciones: true 
  });
  }

  sonIguales(field1: string, field2: string ) {
    return (group: FormGroup) =>  (group.controls[field1].value === group.controls[field2].value) 
                                  ? null : {sonIguales:true};
  }

  registrarUsuario(){
    (this.forma.invalid) ? console.log('forma invalida') :
    (!this.forma.value.condiciones ?
      swal('Importante', 'Debe aceptar las condiciones','warning'): this.crearUser() );
  }

  crearUser() {
    this._usuarioService.crearUsuario( new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
    ))
    .subscribe(r => this.router.navigate(['/login']));
  }

}

