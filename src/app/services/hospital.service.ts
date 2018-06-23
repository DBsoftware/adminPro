import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  constructor( public http: HttpClient,
              public router: Router,
              public servicioSubida: UploadService) {
  }

  crearhospital(hospital: Hospital) {
    return this.http.post(`${URL_SERVICIOS}/hospital?token=${localStorage.getItem('token')}`, hospital)
    .pipe(map((r: any) => {
      swal('hospital creado', hospital.nombre, 'success');
      return r.hospital;
    }));
  }

  actualizarhospital(hospital: Hospital, objetoAuxiliar? ) {
    return this.http.put(`${URL_SERVICIOS}/hospital/${hospital._id}?token=${localStorage.getItem('token')}`,
    (objetoAuxiliar) ? objetoAuxiliar : hospital)
    .pipe(map((r: any) =>  {
      swal('hospital Actualizado', hospital.nombre, 'success');
    })
  );
  }

  cambiarImagen(file: File, id: string) {
    this.servicioSubida.upload(file, 'hospitales', id)
                .then((resp: any) => {
                  swal('La imagen fue guardada', this.hospital.nombre, 'success');
                })
                .catch(resp => console.log(resp));
  }
  cargarHospitales(desde: number = 0 ) {
    return this.http.get(`${URL_SERVICIOS}/hospital?desde=${desde}&limite=5`);
  }

  buscarHospital(t: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/hospitales/${t}`)
                    .pipe(map((r: any) => r.aux));
  }
  obtenerHospital(t: string) {
    return this.http.get(`${URL_SERVICIOS}/hospital/${t}`).pipe(map((r: any) => r.aux));
  }

  borrarHospital(id: any) {
    return this.http.delete(`${URL_SERVICIOS}/hospital/${id}?token=${localStorage.getItem('token')}`)
                    .pipe(map((r: any) => {
                      swal('Operación exitosa', 'El hospital ha sido eliminado del sistema', 'success');
                      return true;
                    }));
  }
}
