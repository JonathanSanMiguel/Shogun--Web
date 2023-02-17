import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkService } from '../../services/work.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private service: WorkService) { }

  // Obtiene los datos del usuario
  // que inicio sesion.
  get usuario() {
    return this.service.userAuth
  }

  LogOut(){

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Se cerrara la sesion actual, y se te redireccionara al Login",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',

      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar Sesion!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.LogOut()
        this.router.navigateByUrl('./auth/login')
        Swal.fire(
          'Sesion Concluida!',
          'Se cerro la sesion Correctramente.',
          'success'
        )
      }
    })

  }

}