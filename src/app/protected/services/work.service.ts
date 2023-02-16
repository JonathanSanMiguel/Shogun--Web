import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.userAuth
  }
  
  get userAuth() {
    return this.authservice.user
  }

  LogOut() {
    localStorage.removeItem('JsonWebToken')
  }
}
