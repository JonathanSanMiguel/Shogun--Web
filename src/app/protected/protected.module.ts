import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { ModalComponent } from './pages/modal/modal.component';
import { NavbarComponent } from './pages/navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FormularioComponent,
    GaleryComponent,
    ModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
