import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyeccion de los servicios.
  constructor(private http: HttpClient) { }

  // EndPoint del ApiREST.
  Api_Uri: string = 'http://localhost:4000/gymkhana/auth'

  // Propiedad para guardar los datos
  // del usuario que inicio sesion.
  private _usuario!: Usuario

  // get para obtener desde otra clase el
  // objeto con los datos del usuario.
  get user() {
    return {...this._usuario}
  }

  // Metodo para iniciar sesion.
  Login(data: AuthResponse) {

    // EndPoint para el Login.
    const Url: string = `${this.Api_Uri}/login`

    // Peticion POST con el URL, y el objeto con los datos.
    return this.http.post<AuthResponse>(Url, data).pipe(

      // 'tap' sirve para validar primero la response
      // antes de continuar.
      tap(resp => {
        if (resp.status) {
          // Guarda el JsonWebToken en el LocalStorage.
          localStorage.setItem('JsonWebToken', resp.JWtoken)
        }
      }),
      // Transmuta la response para solo mandar
      // la propiedad 'status'.
      map(resp => resp.status),

      // Si hay error, mandara el mensaje del error.
      catchError(err => of(err.error.message))
    )
  }

  Sigin(data: AuthResponse) {
    // EndPoint para el Login.
    const Url: string = `${this.Api_Uri}/newUser`

    // Peticion POST con el URL, y el objeto con los datos.
    return this.http.post<AuthResponse>(Url, data).pipe(

      // 'tap' sirve para validar primero la response
      // antes de continuar.
      tap(resp => {
        if (resp.status) {
          // Guarda el JsonWebToken en el LocalStorage.
          localStorage.setItem('JsonWebToken', resp.JWtoken)
        }
      }),
      // Transmuta la response para solo mandar
      // la propiedad 'status'.
      map(resp => resp.status),

      // Si hay error, mandara el mensaje del error.
      catchError(err => of(err.error.message))
    )
  }

  // Valida con el BackEnd, El JsonWebToken.
  ValidarJWToken(): Observable<boolean> {

    const Url: string = `${this.Api_Uri}/renew`

    const headers = new HttpHeaders().set(
      'X-Token', localStorage.getItem('JsonWebToken') || ''
    )

    return this.http.get<AuthResponse>(Url, {headers}).pipe(
      map(
        resp => {
          // Guarda el JsonWebToken en el LocalStorage.
          localStorage.setItem('JsonWebToken', resp.JWtoken)

          // Asigna los datos de la response
          // al objeto '_usuario'.
          this._usuario = {
            uid: resp.uid,
            nombre: resp.nombre,
            apellido: resp.apellido
          }

          return resp.status
        }
      ),
      catchError(err => of(false))
    )
  }

}