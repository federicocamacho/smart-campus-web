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
   * @param value
   * @returns
   * @memberof StringUtils
   */
  public static isNullOrEmpty(value: string): boolean {
    return value && value.trim() !== '';
  }

  /**
   * Determines wether each element of an array of strings 
   * are null or an empty string (taking into account trailing whitespaces).
   *
   * @date 2018-11-04
   * @param values
   * @returns
   * @memberof StringUtils
   */
  public static areNullOrEmpty(...values: string[]): boolean {
    if (!values) { return true; }

    for (const value of values) {
      if (this.isNullOrEmpty(value)) {
        return true;
      }
    }
    return false;
  }

}
