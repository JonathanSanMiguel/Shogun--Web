import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WorkService } from '../../services/work.service';
import { WorkResponse } from '../../interfaces/work.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() registro!: WorkResponse

  constructor(
    private workService: WorkService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    // Crea un objeto de tipo date con el la fecha del registro.
    var fecha = new Date(this.registro.fecha)
    
    const fechaISO = fecha.toISOString(); // formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
    const fechaCorta = fechaISO.substring(0, 10); // "YYYY-MM-DD"
    
    // Crea un objeto con los datos del @Input
    const datosDelRegistro = {
      //image: this.registro.image,
      nombre: this.registro.nombre,
      descripcion: this.registro.descripcion,
      fecha: fechaCorta
      //factura: this.registro.factura
    }
    this.formularioUpdate.patchValue(datosDelRegistro)
  }

  cerrarModal(){
    this.workService.$modal.emit(false)
  }


  formularioUpdate: FormGroup = this.formBuilder.group({
    image: [, Validators.required],
    nombre: [, Validators.required],
    descripcion: [, Validators.required],
    fecha: [, Validators.required],
    factura: [, Validators.required]
  })


  // Metodo para validar el archivo que se +
  // selecciona como 'Imagen'.
  validarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileI = event.target.files[0]
      if (fileI && (fileI.type === 'image/jpeg' || fileI.type === 'image/png')) {
        this.formularioUpdate.patchValue({
          image: fileI,
        })
      } else {
        this.formularioUpdate.patchValue({
          image: null,
        })
      }
    }
  }


  validarFactura(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileF = event.target.files[0]
      if (fileF && (fileF.type === 'application/pdf' || fileF.type === 'application/msword')) {
        this.formularioUpdate.patchValue({
          factura: fileF,
        })
      } else {
        this.formularioUpdate.patchValue({
          factura: null,
        })
      }
    }
  }

  
  ValidarCampo(campo: string) {
    return this.formularioUpdate.controls[campo].errors && this.formularioUpdate.controls[campo].touched
  }


  actualizar(){
    console.log(this.formularioUpdate.value)
  }


}
