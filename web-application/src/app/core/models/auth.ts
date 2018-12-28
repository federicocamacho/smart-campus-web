
/**
 * Model used for user's authentication input.
 *
 * @date 2018-11-03
 * @export
 * @class LoginInput
 */
export class LoginInput {
  public username: string;
  public password: string;

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }
}

/**
 * Model used for user's register input.
 *
 * @date 2018-11-03
 * @export
 * @class SigningInput
 */
export class SigningInput {
  public email: string;
  public name: string;
  public password: string;
  public passwordCheck: string;
  public username: string;

  constructor(username?: string, email?: string, name?: string, password?: string, passwordCheck?: string) {
    this.username = username;
    this.password = password;
    this.passwordCheck = passwordCheck;
    this.email = email;
    this.name = name;
  }

}
