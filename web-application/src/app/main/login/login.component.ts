import { Component } from '@angular/core';

import { LoginInput, SigningInput, UserCookie } from '../../core/models/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

/**
 * Login, Signing and Change password component for the application.
 * @date 2018-08-17
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  /**
   * Includes the fields filled by the user when is loging in.
   *
   * @type {LoginInput}
   * @memberof LoginComponent
   */
  public login: LoginInput;

  /**
   * Determines whether the form is a login form (1) or signing form (0)
   *
   * @memberof LoginComponent
   */
  public isLogin: boolean;

  /**
   * Includes the fields filled by the user to signin.
   *
   * @type {SigningInput}
   * @memberof LoginComponent
   */
  public signing: SigningInput;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLogin = true;
    this.login = new LoginInput();
    this.signing = new SigningInput();
  }

  /**
   * Changes the form to be displayed (login or signin).
   *
   * @date 2018-11-03
   * @memberof LoginComponent
   */
  public changeLoginOption() {
    this.isLogin = !this.isLogin;
  }

  /**
   * Executed when the user performs the login action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doLogin(): void {
    // TODO: Implement this like for real
    if (!this.login.isValid()) { return; }

    const userCookie = new UserCookie(this.login.username, '', '', '', 'asdfghjk');

    this.cookieService.set('user', JSON.stringify(userCookie), 1);
    this.router.navigate(['/dashboard']);
  }

  /**
   * Executed when the user performs the signing action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doSigning(): void {
    // TODO: Implement this
  }
}
