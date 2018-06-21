import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medico: Medico;
  constructor( public http: HttpClient,
              public router: Router,
              public servicioSubida: UploadService) {
  }

  crearMedico(medico: Medico) {
    return this.http.post(`${URL_SERVICIOS}/medico?token=${localStorage.getItem('token')}`, medico)
    .pipe(map((r: any) => {
      swal('medico creado', medico.nombre, 'success');
      return r.aux;
    }));
  }

  actualizarMedico(medico: Medico, objetoAuxiliar? ) {
    return this.http.put(`${URL_SERVICIOS}/medico/${medico._id}?token=${localStorage.getItem('token')}`,
    (objetoAuxiliar) ? objetoAuxiliar : medico)
    .pipe(map((r: any) =>  {
      swal('medico Actualizado', medico.nombre, 'success');
    })
  );
  }

  cambiarImagen(file: File, id: string) {
    this.servicioSubida.upload(file, 'medicos', id)
                .then((resp: any) => {
                  swal('La imagen fue guardada', this.medico.nombre, 'success');
                })
                .catch(resp => console.log(resp));
  }
  cargarMedicos(desde: number = 0 ) {
    return this.http.get(`${URL_SERVICIOS}/medico?desde=${desde}&limite=5`);
  }

  buscarMedico(t: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/medicos/${t}`)
                    .pipe(map((r: any) => r.aux));
  }

  borrarMedico(id: any) {
    return this.http.delete(`${URL_SERVICIOS}/medico/${id}?token=${localStorage.getItem('token')}`)
                    .pipe(map((r: any) => {
                      swal('Operación exitosa', 'El medico ha sido eliminado del sistema', 'success');
                      return true;
                    }));
  }

  obtenerMedico(t: string) {
    return this.http.get(`${URL_SERVICIOS}/medico/${t}`).pipe(map((r: any) => r.aux));
  }
}
