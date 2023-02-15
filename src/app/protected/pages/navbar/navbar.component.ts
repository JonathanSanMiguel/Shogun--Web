import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkService } from '../../services/work.service';


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
    this.service.LogOut()
    this.router.navigateByUrl('./auth/login')
  }

}