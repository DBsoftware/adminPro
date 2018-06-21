import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  users: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = true;
  constructor(public usrSrv: UsuarioService, public muSrv: ModalUploadService ) { }

  ngOnInit() {
    this.loadUsers();
    this.muSrv.notification.subscribe(r => this.loadUsers());
  }

  loadUsers() {
    this.cargando = true;
    this.usrSrv.loadUsers(this.desde)
                .subscribe((r: any) => {
                  this.totalRegistros = r.total;
                  this.users = r.aux;
                  this.cargando = false;
                });
  }

  cambiarDesde(n) {
  this.desde = (this.desde + n) >= this.totalRegistros || (this.desde + n) < 0 ?
                this.desde :
                (this.desde + n);
  this.loadUsers();
  }
  buscarUser(termino: string) {
    this.cargando = true;
    if (termino.length === 0 ) {
      this.loadUsers();
      return;
    }
    this.usrSrv.searchUser(termino).subscribe((r: Usuario[]) => {
      this.users = r;
      this.cargando = false;
    });
  }

  borrar(aux: Usuario) {
    aux._id === localStorage.getItem('id') ?
    swal('No se puede borrar Usuario', 'No se puede borrar a ud mismo', 'error') :
    swal(
      {
        title: 'Está seguro?',
        text: `Está a punto de eliminar a ${aux.nombre} del sistema`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((result) => {
      result ? this.usrSrv.deleteUser(aux._id).subscribe(() => this.loadUsers()) : console.log(result);
    });
  }

  guardar(u: Usuario) {
    const o: Usuario = {};
    o.role = u.role;
    this.usrSrv.actualizarUsuario(u, o).subscribe();
  }

  mostrarModal(id: string) {
      this.muSrv.mostrarModal('usuarios', id);
  }
}
