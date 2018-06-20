import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public id: string;
  public tipo: string;
  public oculto: string = 'd-none';
  public notification = new EventEmitter<any>();
  constructor() { }
  ocultarModal() {
    this.tipo = null;
    this.id = null;
    this.oculto = 'fadeOut';
    setTimeout(() => {
      this.oculto = 'd-none';
    }, 900);
  }
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
