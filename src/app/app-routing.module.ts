import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { ValidarJwtGuard } from './auth/guards/validar-jwt.guard';
import { ConfirmarJwtGuard } from './protected/guards/confirmar-jwt.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [ ConfirmarJwtGuard ],
    // canLoad: [ ConfirmarJwtGuard ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ ValidarJwtGuard ],
    canLoad: [ ValidarJwtGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
