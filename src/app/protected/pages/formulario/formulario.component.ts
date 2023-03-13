import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor(
    private formBuilder: FormBuilder,
    private service: WorkService,
    private router: Router
  ) {}

  // Obtiene los datos del usuario
  // que inicio sesion.
  get usuario() {
    return this.service.userAuth
  }
  
  
  folioGenerado!: number
  
  formularioCreate: FormGroup = this.formBuilder.group({
    image: [,
      [
        Validators.required
      ]
    ],
    nombre: [, 
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]
    ],
    descripcion: [,
      [
        Validators.required,
        Validators.maxLength(500)
      ]
    ],
    fecha: [,
      [
        Validators.required
      ]
    ],
    folio: [,
      [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern('^[0-9]*$'),
      ]
    ],
    factura: [,
      [
        Validators.required
      ]
    ]
  })
  
  // Metodo para validar el arhivo que se +
  // selecciona como 'Imagen'.
  validarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileI = event.target.files[0]
      if (fileI && (fileI.type === 'image/jpeg' || fileI.type === 'image/png')) {
        this.formularioCreate.patchValue({
          image: fileI,
        })
      } else {
        this.formularioCreate.patchValue({
          image: null,
        })
      }
    }
  }
  
  validarFactura(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileF = event.target.files[0]
      if (fileF && (fileF.type === 'application/pdf' || fileF.type === 'application/msword')) {
        this.formularioCreate.patchValue({
          factura: fileF,
        })
      } else {
        this.formularioCreate.patchValue({
          factura: null,
        })
      }
    }
  }
  
  generarFolio(){
    this.folioGenerado = Math.floor(Math.random() * (1000000000 - 100000000) + 100000000)
    
    this.formularioCreate.controls['folio'].setValue(this.folioGenerado)
  }
  
  guardar(){
    if (this.formularioCreate.invalid) {
      this.formularioCreate.markAllAsTouched()
    } else {

      const formData = new FormData()
      
      formData.append('usuarioId', this.usuario.uid)
      formData.append('image', this.formularioCreate.get('image')?.value)
      formData.append('nombre', this.formularioCreate.get('nombre')?.value)
      formData.append('descripcion', this.formularioCreate.get('descripcion')?.value)
      formData.append('fecha', this.formularioCreate.get('fecha')?.value)
      formData.append('folio', this.formularioCreate.get('folio')?.value)
      formData.append('factura', this.formularioCreate.get('factura')?.value)
      
      this.service.create(formData).subscribe(
        resp => {
          // Valida si la resp es 'true'.
          if (resp === true) {

            // Mandara una alerta de inicio de sesion.
            Swal.fire({
              position: 'top-right',
              icon: 'success',
              title: 'Registro Creado',
              showConfirmButton: false,
              timer: 2000
            })
            
            // Redireccionara al usuario a la 'galeria'
            this.router.navigateByUrl('/dashboard/galery')
          } else {
            // SI hay error, mandara una alerta, con el error.
            Swal.fire('Error', resp, 'error')
          }
        }
      )
    }
  }

  ValidarCampo(campo: string){
    return this.formularioCreate.controls[campo].errors && this.formularioCreate.controls[campo].touched
  }

}