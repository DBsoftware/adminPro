import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  Hospitales: Hospital[];
  medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public medicoService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService
            ) {
              this.activatedRoute.params.subscribe(params => {
                (params['id'] !== 'nuevo') ?
                  this.cargarMedico( params['id'] ) :
                  this.medico = this.medico;
              });
            }

  ngOnInit() {
      this.hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        this.Hospitales = resp.aux;
      });
      this.modalUploadService.notification
      .subscribe((r: any) => this.medico.img = r.aux.img);
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedico(id).subscribe((r: any) => {
        this.medico = r;
        this.cambioHospital(this.medico.hospital);
    });
  }
  guardarMedico(f) {
    (f.valid) ?
    this.resolverCarrefour(f) :
    console.log('formulario invalido');
  }
  cambioHospital(id) {
    this.hospitalService.obtenerHospital(id)
    .subscribe(resp => this.hospital = resp);
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

  resolverCarrefour(f) {
      !this.medico._id ?
      this.crearMedico(f) :
      this.actualizarMedico();
  }

  actualizarMedico() {
    this.medicoService.actualizarMedico(this.medico)
    .subscribe();
  }

  crearMedico(f) {
    this.medicoService.crearMedico(f.value)
    .subscribe((r: any) => {
      this.medico._id = r._id;
      this.router.navigate(['/medico', r._id]);
    });
  }
}
