import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CoreModule } from '../core.module';
import { AuthService } from '../services/auth.service';

/**
 * Routing guard to control user's navigation when trying to open login page.
 *
 * @date 2018-06-28
 * @export
 * @class LoginGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: CoreModule
})
export class LoginGuard implements CanActivate {

  /**
   * Creates an instance of LoginGuard.
   * @param {AuthService} auth
   * @param {Router} router
   * @memberof LoginGuardService
   */
  constructor(public auth: AuthService, public router: Router) { }

  /**
   * Routing Guard method to check if the user is authenticated or not.
   *
   * @returns {boolean}
   * @memberof AuthGuardService
   */
  public canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}

