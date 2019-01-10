import { ToastOptions } from 'ng2-toasty';

import { IUser, UserCookie } from '..';

/**
 * General Utility methods.
 *
 * @date 2018-12-29
 * @export
 */
export class Utils {

  /**
   * Determines wether a string is null or empty (taking into account trailing whitespaces).
   *
   * @date 2018-11-04
   * @param value the string to be evaluated.
   * @returns true if the string is null/undefined or empty, false otherwise.
   * @memberof Utils
   */
  public static isEmptyString(value: string): boolean {
    return !value || value.trim() === '';
  }

  /**
   * Determines wether one element of an array of strings 
   * is null/undefined or an empty string (taking into account trailing whitespaces).
   *
   * @date 2018-11-04
   * @param values the array of strings to be evaluated.
   * @returns true if the array of strings is null/undefined or empty, false otherwise.
   * @memberof Utils
   */
  public static anyIsEmptyString(...values: string[]): boolean {
    if (!values) { return true; }

    for (const value of values) {
      return this.isEmptyString(value);
    }

    return false;
  }

  /**
   * Transforms a given string into an array of routes (separated by /).
   *
   * @date 2018-11-17
   * @param pathString the path as string.
   * @returns the obtained array of routes.
   * @memberof Utils
   */
  public static getPathArray(pathString: string): string[] {
    if (this.isEmptyString(pathString)) {
      return [];
    }

    return pathString.trim().split('/');
  }

  /**
   * Determines whether an array is null/undefined or empty.
   *
   * @date 2018-11-17
   * @param list the list to be verified.
   * @returns true if the list is null/undefined or empty, false otherwise.
   * @memberof Utils
   */
  public static isEmptyArray(list: any[]): boolean {
    return !list || list.length === 0;
  }

  /**
   * Creates the default config for toasty.
   *
   * @date 2018-12-29
   * @param title of the toasty.
   * @param msg of the toasty.
   * @param [showClose=true] determines whether or not the close button is shown.
   * @returns the {@link ToastOptions}
   * @memberof Utils
   */
  public static buildToastyConfig(title: string, msg: string, showClose = true): ToastOptions {
    return { title, msg, showClose, timeout: 5000, theme: 'bootstrap' };
  }

  /**
   * Maps a UserCookie into a User.
   *
   * @date 2018-12-30
   * @param cookie to be mapped. Nullable.
   * @returns the user, null if the cookie is null.
   * @memberof Utils
   */
  public static userFromCookie(cookie: UserCookie): IUser {
    if (!cookie) {
      return null;
    }
    return {
      id: cookie.id,
      name: cookie.name,
      username: cookie.username,
      email: cookie.email,
      admin: cookie.admin
    };
  }

}
