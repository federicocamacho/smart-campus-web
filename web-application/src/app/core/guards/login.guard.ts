import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AppService } from '../../../app/app.service';
import { CoreModule } from '../core.module';

/**
 * Routing guard to control user's navigation to login page.
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
   * Creates an instance of AuthGuard.
   * @param {AppService} service Application's main service
   * @param {Router} router Angular Router.
   * @memberof AuthGuardService
   */
  constructor(public service: AppService, public router: Router) { }

  /**
   * Checks if the user can navigate to the login page according their authentication status.
   * If not then navigates to the default page (dashboard).
   *
   * @returns {boolean}
   * @memberof AuthGuardService
   */
  public canActivate(): boolean {
    if (this.service.isAuthenticated()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}

