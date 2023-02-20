import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor(private formBuilder: FormBuilder) {}

  formularioCreate: FormGroup = this.formBuilder.group({
    image: [, [Validators.required]],
    nombre: [, [Validators.required]],
    descripcion: [, [Validators.required]],
    fecha: [, [Validators.required]],
    folio: [, [Validators.required]],
    factura: [, [Validators.required]]
  })

  guardar(){
    if (this.formularioCreate.invalid) {
      this.formularioCreate.markAllAsTouched()
    } else {
      console.log(this.formularioCreate.value)
    }
  }

  ValidarCampo(campo: string){
    return this.formularioCreate.controls[campo].errors && this.formularioCreate.controls[campo].touched
  }

}