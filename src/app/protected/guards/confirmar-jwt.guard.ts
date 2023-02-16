import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarJwtGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(): boolean {

    const token = localStorage.getItem('JsonWebToken')

    if (token) {
      this.router.navigate(['/dashboard/galery'])
      return false
    }

    return true
  }

  canLoad(): boolean {

    const token = localStorage.getItem('JsonWebToken')

    if (token) {
      this.router.navigate(['/dashboard/galery'])
      return false
    }

    return true
  }

}