import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }
  upload(arch: File, tipo: String, id: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 ) {
          (xhr.status === 200) ?
          resolve(JSON.parse(xhr.response)) :
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.open('PUT',
      `${URL_SERVICIOS}/upload/${tipo}/${id}`,
      true );
      const fData = new FormData();
      fData.append('img', arch, arch.name);
      xhr.send(fData);
    });
  }
}
