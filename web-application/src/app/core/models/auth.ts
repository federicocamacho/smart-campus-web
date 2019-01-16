/**
 * Model used for user's authentication input.
 *
 * @date 2018-11-03
 * @export
 * @class LoginInput
 */
export class LoginInput {

  public password: string;

  public username: string;

  /**
   * Creates an instance of LoginInput.
   * @date 2019-01-09
   * @memberof LoginInput
   */
  constructor() {}
}

/**
 * Model used for user's register input.
 *
 * @date 2018-11-03
 * @export
 * @class SigningInput
 */
export class SigningInput {

  public admin: boolean;

  public email: string;

  public name: string;

  public password: string;
  
  public username: string;

  /**
   * Creates an instance of SigningInput.
   * @date 2019-01-09
   * @memberof SigningInput
   */
  constructor() {
    this.admin = false; // no admin user can be created from the platform.
  }

}

/**
 * Model used for change password input.
 *
 * @date 2019-01-10
 * @export
 * @class ChangePassInput
 */
export class ChangePassInput {

  public oldPass: string;

  public newPass: string;

  /**
   * Creates an instance of ChangePassInput.
   * @date 2019-01-13
   * @memberof ChangePassInput
   */
  constructor() {}
  
}
