import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {}

  // FormGroup Reactivo para los campos del Login.
  formularioSignin: FormGroup = this.formbuilder.group({
    nombre: [,
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(50)]
      ],
    apellido: [,
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(50)
      ]
    ],
    email: [,
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)
      ]
    ],
    password: [,
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(30)
      ]
    ]
  })

  SignIn() {
    if (this.formularioSignin.invalid) {
      this.formularioSignin.markAllAsTouched()
    } else {

      this.service.Sigin(this.formularioSignin.value).subscribe(
        resp => {
          // Valida si la resp es 'true'.
          if (resp === true) {

            // Mandara una alerta de inicio de sesion.
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Te Registraste Correctamente',
              showConfirmButton: false,
              timer: 2500
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

  ValidarCampo(campo: string) {
    return this.formularioSignin.controls[campo].errors && this.formularioSignin.controls[campo].touched
  }
}
