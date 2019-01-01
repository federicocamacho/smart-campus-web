import { Utils } from '../utils/utils';

/**
 * Model used to map the authenticated user data stored in the cookie
 *
 * @date 2018-11-03
 * @export
 * @class UserCookie
 */
export class UserCookie {
  
  public id: number;
  public email: string;
  public name: string;
  public username: string;
  public token: string;

  constructor(id: number, username: string, email: string, name: string, token: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.token = token;
  }

  /**
   * Returns a {@link UserCookie} object from a JSON String.
   *
   * @date 2018-11-17
   * @static
   * @param cookieAsJson the {@link UserCookie} as JSON.
   * @returns the mapped {@link UserCookie}.
   * @memberof UserCookie
   */
  public static fromJSON(cookieAsJson: string): UserCookie {
    try {
      const cookie: UserCookie = JSON.parse(cookieAsJson);
      return new UserCookie(cookie.id, cookie.username, cookie.email, cookie.name, cookie.token);
    } catch (e) {
      return null;
    }
 }

  /**
   * Validates if the token is valid.
   *
   * @date 2018-11-17
   * @returns true if the token is valid, false otherwise.
   * @memberof UserCookie
   */
  public hasValidToken(): boolean {
    return !Utils.isEmptyString(this.token);
  }

}
