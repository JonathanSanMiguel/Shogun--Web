import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { catchError, tap } from 'rxjs';
import { WorkResponse } from '../../interfaces/work.interface';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  registros: WorkResponse[] = []

  constructor(private service: WorkService) {}

  ngOnInit() {
    ////////? Falta definir el tipo de dato
    this.service.Read().pipe(

      tap(response => this.registros = response.reverse()),

      catchError(async (error) => console.log(error))
    )
    .subscribe()
    //////////? Falta definir el tipo de dato
  }

  verRegistro(data: WorkResponse){
    console.log(data)
  }

}