import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarJwtGuard implements CanActivate, CanLoad {

  constructor(private service: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.service.ValidarJWToken().pipe(
      tap(resp => {
        if (resp) {
          this.router.navigateByUrl('/dashboard/galery')
        }
      })
    )
  }

  canLoad(): Observable<boolean> | boolean {
    return this.service.ValidarJWToken().pipe(
      tap(resp => {
        if (resp) {
          this.router.navigateByUrl('/dashboard/galery')
        }
      })
    )
  }

}