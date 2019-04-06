import { HttpHeaders } from '@angular/common/http';
import { MatSnackBarConfig } from '@angular/material';

/**
 * General utility methods.
 *
 * @date 2019-03-31
 * @export
 */
export class Util {

  // tslint:disable-next-line:ban-types
  public static options(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  public static snackOptions(): MatSnackBarConfig {
    return {
      duration: 5000,
      horizontalPosition: 'end',
      panelClass: 'snack-pane'
    };
  }

  public static stringContains(value: string, other: string): boolean {
    return value.toLowerCase().includes(other.trim().toLowerCase());
  }

}
