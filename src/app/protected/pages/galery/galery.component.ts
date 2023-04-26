import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
//import { catchError, tap } from 'rxjs';
import { WorkResponse } from '../../interfaces/work.interface';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  registros: WorkResponse[] = []
  // variable para la vantana modal
  modalSwitch: boolean = false

  datosParaActualizar!: WorkResponse

  // Inyeccion de los servicios.
  constructor(private workService: WorkService) {}

  ngOnInit() {
    // Mantener la comunicacion con el modal.
    this.workService.$modal.subscribe(
      (resp) => {this.modalSwitch = resp}
    )

    this.workService.Read().subscribe(
      (response) => { this.registros = response.reverse() }
    )

    // Inicia la lista de registros
    // this.workService.Read().pipe(

    //   tap(response => this.registros = response.reverse()),

    //   catchError(async (error) => console.log(error))
    // )
    // .subscribe()
  }

  abrirModal(registro: WorkResponse) {
    this.modalSwitch = true
    this.datosParaActualizar = registro
  }

}