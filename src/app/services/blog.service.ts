import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blog: Blog;
  constructor( public http: HttpClient,
              public router: Router,
              public servicioSubida: UploadService) {
  }

  crear(blog: Blog) {
    return this.http.post(`${URL_SERVICIOS}/blog?token=${localStorage.getItem('token')}`, blog)
    .pipe(map((r: any) => {
      swal('blog creado', blog.titulo, 'success');
      return r.aux;
    }));
  }

  actualizar(blog: Blog, objetoAuxiliar? ) {
    return this.http.put(`${URL_SERVICIOS}/blog/${blog._id}?token=${localStorage.getItem('token')}`,
    (objetoAuxiliar) ? objetoAuxiliar : blog)
    .pipe(map((r: any) =>  {
      swal('blog Actualizado', blog.titulo, 'success');
    })
  );
  }

  cambiarImagen(file: File, id: string) {
    this.servicioSubida.upload(file, 'blogs', id)
                .then((resp: any) => {
                  swal('La imagen fue guardada', this.blog.titulo, 'success');
                })
                .catch(resp => console.log(resp));
  }
  cargar(desde: number = 0 ) {
    return this.http.get(`${URL_SERVICIOS}/blog?desde=${desde}&limite=5`);
  }

  buscar(t: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/blogs/${t}`)
                    .pipe(map((r: any) => r.aux));
  }

  borrar(id: any) {
    return this.http.delete(`${URL_SERVICIOS}/blog/${id}?token=${localStorage.getItem('token')}`)
                    .pipe(map((r: any) => {
                      swal('Operación exitosa', 'El blog ha sido eliminado del sistema', 'success');
                      return true;
                    }));
  }

  obtener(t: string) {
    return this.http.get(`${URL_SERVICIOS}/blog/${t}`).pipe(map((r: any) => r.aux));
  }
}
