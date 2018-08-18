import { Component, OnInit } from '@angular/core';
import { LoginOptions } from '../../../../shared/enums';
import { LoginInput, SigningInput, ChangePasswordInput } from '../../../../shared/models';

/**
 * Login, Signing and Change password component for the application.
 * @date 2018-08-17
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  /**
   * Includes the fields filled by the user to change the password.
   *
   * @type {ChangePasswordInput}
   * @memberof LoginComponent
   */
  public forgotPassword: ChangePasswordInput;


  /**
   * Includes the fields filled by the user when is executing a login.
   *
   * @type {LoginInput}
   * @memberof LoginComponent
   */
  public login: LoginInput;

  /**
   * Binded to the form to be displayed (LOGIN = 0, SIGNING = 1, PASSWORD = 2).
   *
   * @type {number}
   * @memberof LoginComponent
   */
  public loginMode: number;

  /**
   * Includes the fields filled by the user to signin.
   *
   * @type {SigningInput}
   * @memberof LoginComponent
   */
  public signing: SigningInput;

  /**
   * Creates an instance of LoginComponent.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  constructor() {
    this.loginMode = LoginOptions.LOGIN;
    this.login = new LoginInput();
    this.signing = new SigningInput();
    this.forgotPassword = new ChangePasswordInput();
  }

  ngOnInit() {}

  /**
   * Changes LoginMode attribute to change the currently displayed form.
   * @date 2018-08-17
   * @param {number} option
   * @memberof LoginComponent
   */
  public changeLoginOption(option: number) {
    this.loginMode = option;
  }

  /**
   * Executed when the user performs the change password action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public changePassword(): void {

  }

  /**
   * Executed when the user performs the login action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doLogin(): void {

  }

  /**
   * Executed when the user performs the signing action.
   * @date 2018-08-17
   * @memberof LoginComponent
   */
  public doSigning(): void {

  }

}
