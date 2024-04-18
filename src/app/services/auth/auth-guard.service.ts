import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IsAdminService } from './is-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private isAdminService: IsAdminService) {}

  canActivate(): any {
    return this.isAdminService.isAdmin;
  }
}
