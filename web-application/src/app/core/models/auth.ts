
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

  constructor() {
    this.admin = false; // no admin user can be created from the platform.
  }

}
