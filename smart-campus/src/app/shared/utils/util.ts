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

  /**
   * Returns the miliseconds of a date in UTC timezone.
   *
   * @date 2019-04-15
   * @param date - date to be transformed. Nullable.
   * @returns the miliseconds in UTC, null if the date is null.
   */
  public static toMilisUTC(date: Date): number {
    if (!date) {
      return null;
    }
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  /**
   * Transforms the Date to UTC.
   *
   * @date 2019-04-15
   * @param date - date to be transformed. Nullable.
   * @returns the Date in UTC, null if the date is null.
   */
  public static toUTC(date: Date): Date {
    if (!date) {
      return null;
    }
    return new Date(this.toMilisUTC(date));
  }

  /**
   * Returns a new Date exact of the given one but with the hours set to be end of the day.
   *
   * @date 2019-04-15
   * @param date - date to be transformed. Nullable.
   * @returns the Date in end of the Day, null if the date is null.
   */
  public static endOfDay(date: Date): Date {
    if (!date) {
      return null;
    }
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59);
    return endOfDay;
  }

  /**
   * Indicates if a given date is today.
   *
   * @date 2019-04-15
   * @param date - date to be verified. Nullable.
   * @returns true if the given date is today, false if it's any other day or if it's null.
   */
  public static isToday(date: Date): boolean {
    if (!date) {
      return null;
    }
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }

}
