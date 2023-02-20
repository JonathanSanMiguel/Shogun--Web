import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkResponse }  from '../interfaces/work.interface'

@Injectable({
  providedIn: 'root'
})
export class WorkService implements OnInit {

  constructor(private authservice: AuthService, private http: HttpClient) { }

  Api_Uri: string = 'http://localhost:4000/gymkhana/crud'

  ngOnInit(): void {
    this.userAuth
  }

  // get para obtener los datos del ususario
  get userAuth() {
    return this.authservice.user
  }

  // Metodo para obtener todos los registros
  Read(): Observable<WorkResponse[]> {

    // EnPoint del api rest
    const Url = `${this.Api_Uri}/works`

    // Guardo en la variable 'headers' el 
    // JsonWebToken actual y lo nombro 'X-Token'
    const headers = new HttpHeaders().set(
      'X-Token', localStorage.getItem('JsonWebToken') || ''
    )

    // Peticion con el Url del api, y el token del header.
    return this.http.get<WorkResponse[]>(Url, {headers})
  }

  create(data: WorkResponse) {
    
    const Url = `${this.Api_Uri}/create`

    return this.http.post(Url, data)
  }

  // Metodo para cerrar sesion
  LogOut() {
    localStorage.removeItem('JsonWebToken')
  }
}