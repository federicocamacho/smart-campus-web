import { StringUtils } from 'sc-common';
import { Validated } from '../interfaces';

/**
 * Model used for user's authentication input.
 *
 * @date 2018-11-03
 * @export
 * @class LoginInput
 */
export class LoginInput implements Validated {
  public username: string;
  public password: string;

  constructor(username?, password?) {
    this.username = username;
    this.password = password;
  }

  public isValid(): boolean {
    return !StringUtils.anyIsNullOrEmpty(this.username, this.password);
  }
}

/**
 * Model used for user's register input.
 *
 * @date 2018-11-03
 * @export
 * @class SigningInput
 */
export class SigningInput implements Validated {
  public email: string;
  public lastName: string;
  public name: string;
  public password: string;
  public passwordCheck: string;
  public username: string;

  constructor(username?, email?, name?, lastName?, password?, passwordCheck?) {
    this.username = username;
    this.password = password;
    this.passwordCheck = passwordCheck;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
  }

  public isValid(): boolean {
    if (StringUtils.anyIsNullOrEmpty(this.username, this.password)) { return false; }
  }
}

