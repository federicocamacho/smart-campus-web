import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { ToastyService } from 'ng2-toasty';

import { 
  ApiError,
  ApiException,
  User,
  LoginInput,
  SigningInput,
  UserCookie 
} from '../../core';
import { AppService } from '../../app.service';
import { Cleanable, Utils } from '../../core';
import { UserService } from '../../core/api/user.service';
  
/**
 * Login, and Signing component.
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

  /**
   * Creates an instance of LoginComponent.
   * @date 2019-01-09
   * @param service Application's main service.
   * @param cookieService Cookie service (used for authentication).
   * @param router Angular router.
   * @param toasty Toasty handler.
   * @param userService Uer API service.
   * @memberof LoginComponent
   */
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
        (res: HttpResponse<User>) => {
          this.validationError = null;
          this.authentication(res);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.handleAuthenticationError(err);
          this.service.isBusyGlobally = false;
        }
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
        (res: HttpResponse<User>) => {
          this.validationError = null;
          this.authentication(res);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.handleAuthenticationError(err);
          this.service.isBusyGlobally = false;
        }
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
  public onUsernameChanged(username: string, isLogin: boolean): void {
    if (isLogin) {
      this.login.username = username;
    } else {
      this.signing.username = username;
    }
    this.validationError = null;
  }

  /**
   * Creates and stores the cookie for the given user, sets it's timeout 
   * sets the isLogedIn flag, stores the current user 
   * and navigates when authentication was successful.
   *
   * @date 2018-12-29
   * @private
   * @param res the {@link HttpResponse} that contains the {@link User}.
   * @memberof LoginComponent
   */
  private authentication(res: HttpResponse<User>): void {
    const user = res.body;
    const userCookie = new UserCookie(user.id, user.username, user.email, user.name, user.admin);

    // expiration of the cookie is 2 hours.
    // TODO expire angular session when the cookie timesout.
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    this.cookieService.set('user', JSON.stringify(userCookie), expirationDate);
    this.service.isLogedIn = true;
    this.service.user = user;
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handles an APIError when executing login and signing requests.
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
    if (err.exception === ApiException.RECORD_EXISTS ||
        err.exception === ApiException.BAD_CREDENTIALS) {
      this.validationError = err.message;
      this.signing.username = null;
    } else if (err.exception === ApiException.ILLEGAL_ARGUMENT) {
      this.validationError = err.message;
    } else {
      this.toasty.error(Utils.buildToastyConfig('ERROR', err.message));
    }
  }

}
