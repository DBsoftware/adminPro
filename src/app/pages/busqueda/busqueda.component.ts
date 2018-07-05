import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  blogs: Blog[] = [];
  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) {
    this.activatedRoute.params.subscribe(p => {
      this.buscar(p['termino']);
    });
  }

  ngOnInit() {
  }
  buscar(termino: string) {
    termino = termino === '' ? '%20' : termino;
    this.http.get(`${URL_SERVICIOS}/busqueda/todo/${termino}`)
    .pipe(map((r: any) => r.aux))
    .subscribe(r => {
      [this.productos, this.blogs, this.usuarios] = r;
      console.log(this.productos);
    });
  }
}
