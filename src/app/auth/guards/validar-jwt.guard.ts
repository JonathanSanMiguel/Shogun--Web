import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarJwtGuard implements CanActivate, CanLoad {

  constructor(private service: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.service.ValidarJWToken().pipe(
      tap(resp => {
        if (!resp) {
          this.router.navigateByUrl('/auth/login')
        }
      })
    )
  }
    
  canLoad(): Observable<boolean> | boolean {
    return this.service.ValidarJWToken().pipe(
      tap(resp => {
        if (!resp) {
          this.router.navigateByUrl('/auth/login')
        }
      })
    )
  }

}
