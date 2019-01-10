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
