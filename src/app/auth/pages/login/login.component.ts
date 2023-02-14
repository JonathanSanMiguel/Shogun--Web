import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formbuilder: FormBuilder) {}

  formularioLogin: FormGroup = this.formbuilder.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(6)]]
  })

  Login() {
    console.log(this.formularioLogin.value)
  }

}