import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { CookieService } from 'ngx-cookie-service';
import { UserCookie } from '../models';

/**
 * Service to control Authentication
 *
 * @date 2018-06-28
 * @export
 * @class AuthenticationService
 */
@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  /**
   * Checks if there's a used logedin.
   *
   * @returns {boolean}
   * @memberof AuthenticationService
   */
  public isAuthenticated(): boolean {
    if (this.cookieService.check('user')) {
      try {
        const user: UserCookie = UserCookie.fromJSON(this.cookieService.get('user'));
        return user && user.hasValidToken();
      } catch (e) {
        return false;
      }
    }

    return false;
  }
}
