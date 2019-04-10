import { HttpHeaders } from '@angular/common/http';
import { MatSnackBarConfig } from '@angular/material';

/**
 * General utility methods.
 *
 * @date 2019-03-31
 * @export
 */
export class Util {

  /**
   * Retrieve the General HTTP options.
   *
   * @date 2019-04-09
   * @returns - The options object.
   */
  // tslint:disable-next-line:ban-types
  public static options(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  /**
   * Retrieves the general Material Snack config used in the app.
   *
   * @date 2019-04-09
   * @returns - The snackbar options.
   */
  public static snackOptions(): MatSnackBarConfig {
    return {
      duration: 5000,
      horizontalPosition: 'end',
      panelClass: 'snack-pane'
    };
  }

  /**
   * Checks if a string contains (ignoring case and trailing whitespaces).
   *
   * @date 2019-04-09
   * @param value - String to be compared. Not nullable.
   * @param other - String checked to be contained inside the other. Not nullable.
   * @returns true if the string is contained in the other, false otherwise.
   */
  public static stringContains(value: string, other: string): boolean {
    return value.toLowerCase().includes(other.trim().toLowerCase());
  }

}
