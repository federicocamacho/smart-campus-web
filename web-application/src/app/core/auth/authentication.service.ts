import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

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
export class AuthenticationService {

  /**
   * Creates an instance of AuthenticationService.
   * @memberof AuthenticationService
   */
  constructor() { }

  /**
   * Checks if user is currently authenticated checking token in session storage.
   *
   * @returns {boolean}
   * @memberof AuthenticationService
   */
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return (token && token !== '');
  }
}
