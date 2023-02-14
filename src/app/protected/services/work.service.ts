import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private authservice: AuthService) { }

  get userAuth() {
    return this.authservice.user
  }
}
