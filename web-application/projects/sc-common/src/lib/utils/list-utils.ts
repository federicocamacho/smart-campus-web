/**
 * All lists/arrays util methods.
 *
 * @date 2018-11-17
 * @export
 */
export class ListUtils {

  /**
   * Determines whether an array is null/undefined or empty.
   *
   * @date 2018-11-17
   * @param list the list to be verified.
   * @returns true if the list is null/undefined or empty, false otherwise.
   * @memberof ListUtils
   */
  public static isNullOrEmpty(list: any[]): boolean {
    return !list || list.length === 0;
  }
}
