import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  imgUpload: File;
  userAux: Usuario;
  imgTemp: string;
  constructor(public usrSrv: UsuarioService) {
    this.userAux = this.usrSrv.usuario;
  }

  ngOnInit() {
  }

  guardar(u: Usuario) {
    const obj: any  = {};
    obj.nombre = u.nombre;
    this.userAux.nombre = u.nombre;
      this.usrSrv.actualizarUsuario(this.userAux, obj)
      .subscribe();
    }

    selectImg(arch) {
      this.imgUpload = (arch) ?
        arch :
        undefined;
      if (this.imgUpload.type.indexOf('image') < 0 || !this.imgUpload) {
        swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error' );
        this.imgUpload = undefined;
        return;
      }
      const reader = new FileReader();
      const urlImgTemp = reader.readAsDataURL(this.imgUpload);
      reader.onloadend = () => this.imgTemp = reader.result;
    }
    cambiarImg() {
      this.usrSrv.cambiarImagen(this.imgUpload, localStorage.getItem('id'));
    }


}
