import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})

export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = true;
  constructor(public medicoService: MedicoService,
              // public modalUploadSrv: ModalUploadService
            ) { }

  ngOnInit() {
    this.cargarmedicos();
    // this.modalUploadSrv.notification.subscribe(r => this.cargarmedicos());
  }

  cargarmedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
                .subscribe((r: any) => {
                  this.totalRegistros = r.total;
                  this.medicos = r.aux;
                  this.cargando = false;
                });
  }

  cambiarDesde(n) {
  this.desde = (this.desde + n) >= this.totalRegistros || (this.desde + n) < 0 ?
                this.desde :
                (this.desde + n);
  this.cargarmedicos();
  }
  buscarMedico(termino: string) {
    this.cargando = true;
    if (termino.length === 0 ) {
      this.cargarmedicos();
      return;
    }
    this.medicoService.buscarMedico(termino).subscribe((r: Medico[]) => {
      this.medicos = r;
      this.cargando = false;
    });
  }

  editar(h: Medico) {
    const o: Medico = {nombre: h.nombre};
    this.medicoService.actualizarMedico(h, o).subscribe();
  }

  // mostrarModal(id: string) {
  //     this.modalUploadSrv.mostrarModal('medicos', id);
  // }

  borrar(aux: Medico) {
    aux._id === localStorage.getItem('id') ?
    swal('No se puede borrar Medico', 'No se puede borrar a ud mismo', 'error') :
    swal(
      {
        title: 'Está seguro?',
        text: `Está a punto de eliminar a ${aux.nombre} del sistema`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((result) => {
      result ? this.medicoService.borrarMedico(aux._id).subscribe(() => this.cargarmedicos()) : console.log(result);
    });
  }

  crearMedico() {
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
      this.medicoService.crearMedico({nombre: value}).subscribe(() => {
        this.cargarmedicos();
      }) : console.log('cancelado');
    });

  }
}
