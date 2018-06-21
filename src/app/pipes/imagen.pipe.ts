import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    return ( !img ) ? `${URL_SERVICIOS}/img/usu/1234` :
    (img.indexOf('https') >= 0 ? img  : `${URL_SERVICIOS}/img/${this.type(tipo)}${img}`  );
  }

  type(key: string) {
    switch (key) {
      case 'usuario':
        return '/usuarios/';
      case 'hospitales':
        return '/hospitales/';
      case 'medico':
        return '/medicos/';
      default :
        return '';
    }
  }
}
