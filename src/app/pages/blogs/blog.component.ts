import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/service.index';
import { Blog } from '../../models/blog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles: []
})
export class BlogComponent implements OnInit {

  blog = new Blog('', '', '');

  constructor(public blogService: BlogService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService
            ) {
              this.activatedRoute.params.subscribe(params => {
                (params['id'] !== 'nuevo') ?
                  this.cargar( params['id'] ) :
                  this.blog = this.blog;
              });
            }

  ngOnInit() {
      this.modalUploadService.notification
      .subscribe((r: any) => this.blog.img = r.aux.img);
  }

  cargar(id: string) {
    this.blogService.obtener(id).subscribe((r: any) => {
        this.blog = r;
    });
  }
  guardar(f) {
    (f.valid) ?
    this.resolverCarrefour(f) :
    console.log('formulario invalido');
  }


  cambiarFoto() {
    this.modalUploadService.mostrarModal('blogs', this.blog._id);
  }

  resolverCarrefour(f) {
      !this.blog._id ?
      this.crear(f) :
      this.actualizar();
  }

  actualizar() {
    this.blogService.actualizar(this.blog)
    .subscribe();
  }

  crear(f) {
    this.blogService.crear(f.value)
    .subscribe((r: any) => {
      this.blog._id = r._id;
      this.router.navigate(['/blog', r._id]);
    });
  }
}
