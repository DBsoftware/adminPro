import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})

export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = true;
  constructor(public hospitalService: HospitalService, public modalUploadSrv: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadSrv.notification.subscribe(r => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
                .subscribe((r: any) => {
                  this.totalRegistros = r.total;
                  this.hospitales = r.aux;
                  this.cargando = false;
                });
  }

  cambiarDesde(n) {
  this.desde = (this.desde + n) >= this.totalRegistros || (this.desde + n) < 0 ?
                this.desde :
                (this.desde + n);
  this.cargarHospitales();
  }
  buscarUser(termino: string) {
    this.cargando = true;
    if (termino.length === 0 ) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital(termino).subscribe((r: Hospital[]) => {
      this.hospitales = r;
      this.cargando = false;
    });
  }

  guardar(h: Hospital) {
    const o: Hospital = {nombre: h.nombre};
    this.hospitalService.actualizarhospital(h, o).subscribe();
  }

  mostrarModal(id: string) {
      this.modalUploadSrv.mostrarModal('hospitales', id);
  }

  borrar(aux: Hospital) {
    aux._id === localStorage.getItem('id') ?
    swal('No se puede borrar Hospital', 'No se puede borrar a ud mismo', 'error') :
    swal(
      {
        title: 'Está seguro?',
        text: `Está a punto de eliminar a ${aux.nombre} del sistema`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((result) => {
      result ? this.hospitalService.borrarHospital(aux._id).subscribe(() => this.cargarHospitales()) : console.log(result);
    });
  }

  crearHospital() {
    swal(
    {
      content: 'input',
      text: 'Ingresa el nombre del hospital:',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((value: string) => {
      (value !== null && value.trim().length > 0) ?
      this.hospitalService.crearhospital({nombre: value}).subscribe(() => {
        this.cargarHospitales();
      }) : console.log('cancelado');
    });

  }
}
