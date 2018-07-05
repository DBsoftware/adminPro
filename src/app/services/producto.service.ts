import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  producto: Producto;
  constructor( public http: HttpClient,
              public router: Router,
              public servicioSubida: UploadService) {
  }

  crearproducto(producto: Producto) {
    return this.http.post(`${URL_SERVICIOS}/producto?token=${localStorage.getItem('token')}`, producto)
    .pipe(map((r: any) => {
      swal('producto creado', producto.nombre, 'success');
      return r.producto;
    }));
  }

  actualizarproducto(producto: Producto, objetoAuxiliar? ) {
    return this.http.put(`${URL_SERVICIOS}/producto/${producto._id}?token=${localStorage.getItem('token')}`,
    (objetoAuxiliar) ? objetoAuxiliar : producto)
    .pipe(map((r: any) =>  {
      swal('producto Actualizado', producto.nombre, 'success');
    })
  );
  }

  cambiarImagen(file: File, id: string) {
    this.servicioSubida.upload(file, 'app-productos', id)
                .then((resp: any) => {
                  swal('La imagen fue guardada', this.producto.nombre, 'success');
                })
                .catch(resp => console.log(resp));
  }
  cargarProductos(desde: number = 0 ) {
    return this.http.get(`${URL_SERVICIOS}/producto?desde=${desde}&limite=5`);
  }

  buscarProducto(t: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/productos/${t}`)
                    .pipe(map((r: any) => r.aux));
  }
  obtenerProducto(t: string) {
    return this.http.get(`${URL_SERVICIOS}/producto/${t}`).pipe(map((r: any) => r.aux));
  }

  borrarProducto(id: any) {
    return this.http.delete(`${URL_SERVICIOS}/producto/${id}?token=${localStorage.getItem('token')}`)
                    .pipe(map((r: any) => {
                      swal('Operación exitosa', 'El producto ha sido eliminado del sistema', 'success');
                      return true;
                    }));
  }
}
