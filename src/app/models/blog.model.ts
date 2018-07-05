import { Usuario } from './usuario.model';

export class Blog {

    constructor(
        public titulo?: string,
        public img?: string,
        public contenido?: string,
        public autor?: Usuario,
        public _id?: string
    ) { }
}
