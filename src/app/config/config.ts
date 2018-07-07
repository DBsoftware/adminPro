import { environment } from '../../environments/environment';
export const URL_SERVICIOS =   (environment.production) ? 'https://back-modelo.herokuapp.com' : 'http://localhost:3000';
