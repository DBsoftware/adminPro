import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html'
})

export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = true;
  constructor(public blogService: BlogService,
              // public modalUploadSrv: ModalUploadService
            ) { }

  ngOnInit() {
    this.cargar();
    // this.modalUploadSrv.notification.subscribe(r => this.cargarmedicos());
  }

  cargar() {
    this.cargando = true;
    this.blogService.cargar(this.desde)
                .subscribe((r: any) => {
                  this.totalRegistros = r.total;
                  this.blogs = r.aux;
                  this.cargando = false;
                });
  }

  cambiarDesde(n) {
  this.desde = (this.desde + n) >= this.totalRegistros || (this.desde + n) < 0 ?
                this.desde :
                (this.desde + n);
  this.cargar();
  }
  buscar(termino: string) {
    this.cargando = true;
    if (termino.length === 0 ) {
      this.cargar();
      return;
    }
    this.blogService.buscar(termino).subscribe((r: Blog[]) => {
      this.blogs = r;
      this.cargando = false;
    });
  }

  editar(h: Blog) {
    const o: Blog = {titulo: h.titulo};
    this.blogService.actualizar(h, o).subscribe();
  }

  // mostrarModal(id: string) {
  //     this.modalUploadSrv.mostrarModal('medicos', id);
  // }

  borrar(aux: Blog) {
    aux._id === localStorage.getItem('id') ?
    swal('No se puede borrar Medico', 'No se puede borrar a ud mismo', 'error') :
    swal(
      {
        title: 'Está seguro?',
        text: `Está a punto de eliminar a ${aux.titulo} del sistema`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((result) => {
      result ? this.blogService.borrar(aux._id).subscribe(() => this.cargar()) : console.log(result);
    });
  }

  crear() {
    swal(
    {
      content: 'input',
      text: 'Ingresa el nombre del Medico:',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((value: string) => {
      (value !== null && value.trim().length > 0) ?
      this.blogService.crear({titulo: value}).subscribe(() => {
        this.cargar();
      }) : console.log('cancelado');
    });

  }
}
