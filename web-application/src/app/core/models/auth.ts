import { StringUtils } from 'sc-common';

/**
 * Model used to authenticate a user.
 *
 * @date 2018-11-03
 * @export
 * @class LoginInput
 */
export class LoginInput {
  public username: string;
  public password: string;

  constructor(username?, password?) {
    this.username = username;
    this.password = password;
  }

  public isValid(): boolean {
    return StringUtils.areNullOrEmpty(this.username, this.password);
  }
}

/**
 * Model used to register a new user in the platform.
 *
 * @date 2018-11-03
 * @export
 * @class SigningInput
 */
export class SigningInput {
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
}

/**
 * Model used to map the authenticated user data stored in the cookie
 *
 * @date 2018-11-03
 * @export
 * @class UserCookie
 */
export class UserCookie {

  constructor(username?, email?, name?, lastName?, token?) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.token = token;
  }
  public email: string;
  public lastName: string;
  public name: string;
  public username: string;
  public token: string;

  public static fromJSON(cookieAsJson: string): UserCookie {
    try {
      const cookie: UserCookie = JSON.parse(cookieAsJson);
      return new UserCookie(cookie.username, cookie.email, cookie.name, cookie.lastName, cookie.token);
    } catch (e) {
      return null;
    }
 }

  public hasValidToken(): boolean {
    return StringUtils.isNullOrEmpty(this.token);
  }
}
