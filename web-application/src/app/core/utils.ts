import { ToastOptions } from 'ng2-toasty';

/**
 * General Utility methods.
 *
 * @date 2018-12-29
 * @export
 * @class Utils
 */
export class Utils {

  /**
   * Creates the default config for toasty.
   *
   * @date 2018-12-29
   * @static
   * @param title of the toasty.
   * @param msg of the toasty.
   * @param [showClose=true] determines whether or not the close button is shown.
   * @returns the {@link ToastOptions}
   * @memberof Utils
   */
  public static buildToastyConfig(title: string, msg: string, showClose = true): ToastOptions {
    return { title, msg, showClose, timeout: 5000, theme: 'bootstrap' };
  }

}
