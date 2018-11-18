/**
 * All string type utils.
 *
 * @date 2018-11-04
 * @export
 */
export class StringUtils {
  /**
   * Determines wether a string is null or an empty string (taking into account trailing whitespaces).
   *
   * @date 2018-11-04
   * @param value the string to be evaluated.
   * @returns true if the string is null/undefined or empty, false otherwise.
   * @memberof StringUtils
   */
  public static isNullOrEmpty(value: string): boolean {
    return !value || value.trim() === '';
  }

  /**
   * Determines wether one element of an array of strings 
   * is null/undefined or an empty string (taking into account trailing whitespaces).
   *
   * @date 2018-11-04
   * @param values the array of strings to be evaluated.
   * @returns true if the array of strings is null/undefined or empty, false otherwise.
   * @memberof StringUtils
   */
  public static anyIsNullOrEmpty(...values: string[]): boolean {
    if (!values) { return true; }

    for (const value of values) {
      return this.isNullOrEmpty(value);
    }

    return false;
  }

  /**
   * Transforms a given string into an array of routes (separated by /).
   *
   * @date 2018-11-17
   * @param pathString the path as string.
   * @returns the obtained array of routes.
   * @memberof StringUtils
   */
  public static getPathArray(pathString: string): string[] {
    if (this.isNullOrEmpty(pathString)) {
      return [];
    }

    return pathString.trim().split('/');
  }

}
