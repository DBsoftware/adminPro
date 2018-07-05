import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = true;
  constructor(public productoService: ProductoService,
              public modalUploadSrv: ModalUploadService ) { }

  ngOnInit() {
    this.cargarProductos();
    this.modalUploadSrv.notification.subscribe(r => this.cargarProductos());
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos(this.desde)
                .subscribe((r: any) => {
                  this.totalRegistros = r.total;
                  this.productos = r.aux;
                  this.cargando = false;
                });
  }

  cambiarDesde(n) {
  this.desde = (this.desde + n) >= this.totalRegistros || (this.desde + n) < 0 ?
                this.desde :
                (this.desde + n);
  this.cargarProductos();
  }
  buscar(termino: string) {
    this.cargando = true;
    if (termino.length === 0 ) {
      this.cargarProductos();
      return;
    }
    this.productoService.buscarProducto(termino).subscribe((r: Producto[]) => {
      this.productos = r;
      this.cargando = false;
    });
  }

  guardar(p: Producto) {
    this.productoService.actualizarproducto(p).subscribe();
  }

  mostrarModal(id: string) {
      this.modalUploadSrv.mostrarModal('productos', id);
  }

  borrar(aux: Producto) {
    aux._id === localStorage.getItem('id') ?
    swal('No se puede borrar producto', 'No se puede borrar a ud mismo', 'error') :
    swal(
      {
        title: 'Está seguro?',
        text: `Está a punto de eliminar a ${aux.nombre} del sistema`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((result) => {
      result ? this.productoService.borrarProducto(aux._id).subscribe(() => this.cargarProductos()) : console.log(result);
    });
  }

  crearproducto() {
    swal(
    {
      content: 'input',
      text: 'Ingresa el nombre del producto:',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((value: string) => {
      (value !== null && value.trim().length > 0) ?
      this.productoService.crearproducto({nombre: value}).subscribe(() => {
        this.cargarProductos();
      }) : console.log('cancelado');
    });

  }
}
