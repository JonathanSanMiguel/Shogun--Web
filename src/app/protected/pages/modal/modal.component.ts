import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WorkService } from '../../services/work.service';
import { WorkResponse } from '../../interfaces/work.interface';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() registro!: WorkResponse
  urlSegura!: any
  
  constructor(
    private workService: WorkService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
    
  ngOnInit(): void {

    // Crea un objeto de tipo date con el la fecha del registro.
    var fecha = new Date(this.registro.fecha)

    const fechaISO = fecha.toISOString(); // formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
    const fechaCorta = fechaISO.substring(0, 10); // "YYYY-MM-DD"

    // Crea un objeto con los datos del @Input
    const datosDelRegistro = {
      nombre: this.registro.nombre,
      descripcion: this.registro.descripcion,
      fecha: fechaCorta
    }
    this.formularioUpdate.patchValue(datosDelRegistro)
  }

  cerrarModal(){
    this.workService.$modal.emit(false)
  }


  formularioUpdate: FormGroup = this.formBuilder.group({
    image: [,],
    nombre: [, Validators.required],
    descripcion: [, Validators.required],
    fecha: [, Validators.required],
    factura: [,]
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
    if (this.formularioUpdate.invalid) {
      this.formularioUpdate.markAllAsTouched()
    } else {
      this.workService.Update(this.formularioUpdate.value)
    }
  }


  eliminarRegistro(id: string){
    const res = confirm('Estas seguro de borrar este Registro?')

    if (res === true ) {
      this.workService.Delete(id).subscribe(
        res => {
          if(res === true){
            this.cerrarModal()
            this.router.navigateByUrl('/dashboard/galery')
          }
        }
      )
    }
  }
}