import { Injectable } from '@angular/core';

import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth-service';


@Injectable({  providedIn: 'root' })

export class RoleGuardService implements CanActivate {
  
  constructor(public authService : AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
      return this.authService.hasRole(route.data.expectedRole);   
  }
}