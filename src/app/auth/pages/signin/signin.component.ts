import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  formularioSignin: FormGroup = this.formbuilder.group({
    nombre: [, [Validators.required, Validators.maxLength(20)]],
    apellido: [, [Validators.required, Validators.maxLength(30)]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(8)]]
  })

  SignIn(): void {
    if (this.formularioSignin.invalid) {
      this.formularioSignin.markAllAsTouched()
    } else {
      console.log(this.formularioSignin.value)
    }
    //this.router.navigateByUrl('/dashboard/galery')
  }

  ValidarCampo(campo: string) {
    return this.formularioSignin.controls[campo].errors && this.formularioSignin.controls[campo].touched
  }
}
