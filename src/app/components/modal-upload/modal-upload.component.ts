import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { UploadService } from '../../services/upload.service';
import { ModalUploadService } from '../modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imgUpload: File;
  imgTemp: string;
  constructor(public servicioSubida: UploadService, public servicioModal: ModalUploadService) {
  }

  ngOnInit() {
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
    this.servicioSubida.upload(this.imgUpload, this.servicioModal.tipo , this.servicioModal.id)
    .then(r => {
      this.servicioModal.notification.emit(r);
      swal('Operacion exitosa', 'Imagen guardada', 'success' );
      this.cerrarModal();
    })
    .catch(r => console.log(r));
  }

    cerrarModal() {
      this.imgTemp = null;
      this.imgUpload = null;
      this.servicioModal.ocultarModal();
    }

}
