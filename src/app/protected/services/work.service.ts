import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkResponse }  from '../interfaces/work.interface'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkService implements OnInit {

  constructor(private authservice: AuthService, private http: HttpClient) { }

  //Api_Uri: string = 'http://localhost:4000/gymkhana/crud'
  Api_Uri: string = 'https://shogun-gymkhana-production.up.railway.app'

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

  create(data: any) {

    const Url = `${this.Api_Uri}/create`

    const headers = new HttpHeaders().set(
      'X-Token', localStorage.getItem('JsonWebToken') || ''
    )

    return this.http.post<WorkResponse>(Url, data, {headers}).pipe(

      map(resp => resp.status),

      catchError(err => of(err.error.message))
    )
  }

  // Metodo para cerrar sesion
  LogOut() {
    localStorage.removeItem('JsonWebToken')
  }
}