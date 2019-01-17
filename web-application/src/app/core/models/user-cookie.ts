import { User } from './user';

/**
 * Model used to map the authenticated user data stored in a cookie
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

  public admin: boolean;

  /**
   * Creates an instance of UserCookie.
   * @date 2019-01-09
   * @param id of the user.
   * @param username of the user.
   * @param email of the user.
   * @param name of the user.
   * @param admin indicates if the user is an admin or a regular user.
   * @memberof UserCookie
   */
  constructor(id: number, username: string, email: string, name: string, admin: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.admin = admin;
  }

  /**
   * Returns a {@link UserCookie} object from a JSON String.
   *
   * @date 2018-11-17
   * @static
   * @param cookieAsJson the {@link UserCookie} as JSON. Nullable.
   * @returns the mapped {@link UserCookie}. Null if the json is null or invalid.
   * @memberof UserCookie
   */
  public static fromJSON(cookieAsJson: string): UserCookie {
    try {
      const cookie: UserCookie = JSON.parse(cookieAsJson);
      return new UserCookie(cookie.id, cookie.username, cookie.email, cookie.name, cookie.admin);
    } catch (e) {
      return null;
    }
  }

  /**
   * Transforms the passed user into a user cookie.
   *
   * @date 2019-01-16
   * @static
   * @param user to be mapped.
   * @returns the UserCookie.
   * @memberof UserCookie
   */
  public static fromUser(user: User): UserCookie {
    if (!user) { return null; }

    return new UserCookie(user.id, user.username, user.email, user.name, user.admin);
  }
  
}
