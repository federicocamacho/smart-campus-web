import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CoreModule } from '../core.module';
import { AuthenticationService } from '../auth/authentication.service';

/**
 *Routing guard to control user's navigation according if it's authenticated or not
 *
 * @author Federico Camacho
 * @date 2018-06-28
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

  /**
   *Creates an instance of AuthGuardService.
   * @param {AuthenticationService} auth
   * @param {Router} router
   * @memberof AuthGuardService
   */
  constructor(public auth: AuthenticationService, public router: Router) { }

  /**
   *Routing Guard method to check if user's authenticated or not.
   *
   * @returns {boolean}
   * @memberof AuthGuardService
   */
  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}

