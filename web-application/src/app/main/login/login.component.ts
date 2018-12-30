import { Component, ViewEncapsulation } from '@angular/core';

import { LoginInput, SigningInput, UserCookie, IUser, ApiError, ApiException } from '../../core/models';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { UserService } from 'src/app/core/api/user.service';
import { ToastyService } from 'ng2-toasty';
import { Cleanable, Utils } from 'sc-common';
import { takeUntil, take } from 'rxjs/operators';

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

export class LoginComponent extends Cleanable {
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

  /**
   * Validation error showed in the forms.
   *
   * @memberof LoginComponent
   */
  public validationError: string;

  constructor(private service: AppService, 
              private cookieService: CookieService, 
              private router: Router, 
              private toasty: ToastyService,
              private userService: UserService) {
    super();
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
    this.validationError = null;
    this.login = new LoginInput();
    this.signing = new SigningInput();
  }

  /**
   * Executed when the user performs the login action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doLogin(): void {
    this.service.isBusyGlobally = true;
    this.userService.login(this.login)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (user: IUser) => {
          this.validationError = null;
          this.authentication(user.username, user.email, user.name);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => this.handleAuthenticationError(err)
      );
  }

  /**
   * Executed when the user performs the signing action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doSigning(): void {
    this.service.isBusyGlobally = true;
    this.userService.register(this.signing)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (user: IUser) => {
          this.validationError = null;
          this.authentication(user.username, user.email, user.name);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => this.handleAuthenticationError(err)
      );
  }

  /**
   * Username inputs (both login and signing form) ngModelChange handler.
   *
   * @date 2018-12-29
   * @param username new username inserted.
   * @param isLogin true if it's login form, false otherwise.
   * @memberof LoginComponent
   */
  public onUsernameChanged(username: string, isLogin: boolean) {
    if (isLogin) {
      this.login.username = username;
    } else {
      this.signing.username = username;
    }
    this.validationError = null;
  }

  /**
   * Creates and stores the cookie for the given user, sets it's timeout 
   * and navigates when authentication was successful.
   *
   * @date 2018-12-29
   * @private
   * @param username of the authenticaded user
   * @param email of the authenticaded user
   * @param name of the authenticaded user
   * @memberof LoginComponent
   */
  private authentication(username: string, email: string, name: string): void {
    const userCookie = new UserCookie(username, email, name, 'asdfghjk');

    // expiration of the cookie is 2 hours.
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    this.cookieService.set('user', JSON.stringify(userCookie), expirationDate);
    this.service.isLogedIn = true;
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handles APIError when executing login and signing requests.
   * If the exception is unknown it's treated like an INTERNAl.
   * If the exception is ILLEGAL_ARGUMENT (input validation) a message with the error is displayed.
   * If the exception is USER_EXISTS (already exists when signing, doesn't exist when login) then the
   * user is notified about the problem with the username input.
   *
   * @date 2018-12-29
   * @private
   * @param err ApiError obtained from the request.
   * @memberof LoginComponent
   */
  private handleAuthenticationError(err: ApiError): void {
    if (!err.exception) {
      err.exception = ApiException.INTERNAL;
    }
    if (err.exception === ApiException.USER_EXISTS) {
      this.validationError = err.message;
      this.signing.username = null;
    } else if (err.exception === ApiException.ILLEGAL_ARGUMENT) {
        this.validationError = err.message;
    } else {
      this.toasty.error(Utils.buildToastyConfig('ERROR', err.message));
    }
    this.service.isBusyGlobally = false;
  }

}
