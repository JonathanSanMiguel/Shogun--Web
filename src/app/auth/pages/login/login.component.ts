import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inyeccion de los servicios.
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {}

  // FormGroup Reactivo para los campos del Login.
  formularioLogin: FormGroup = this.formbuilder.group({
    email: ['ashe@correo.com', [Validators.required, Validators.email]],
    password: ['bobhazalgo', [Validators.required, Validators.minLength(6)]]
  })


  Login(): void {
    // Envia los datos que tenga el formulario, al servicio, 
    this.service.Login(this.formularioLogin.value).subscribe(
      resp => {

        // Valida si la resp es 'true'.
        if (resp === true) {

          // Mandara una alerta de inicio de sesion.
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Iniciaste Sesion Correctamente',
            showConfirmButton: false,
            timer: 2200
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