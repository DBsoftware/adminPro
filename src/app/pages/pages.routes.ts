import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const Proutes: Routes = [

        { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
        { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        { path: 'Rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
        { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
        { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
        { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
        { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
        // Matenimiento
        { path: 'usuarios',
            canActivate: [AdminGuard],
            component: UsuariosComponent,
            data: {titulo: 'Mantenimiento de usuarios'}},
        { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'}},
        { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar de medico'}},
        { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(Proutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
