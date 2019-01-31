import { ActivatedRoute, NavigationExtras, Params, } from '@angular/router';
import { ToastOptions } from 'ng2-toasty';

import { Application } from '../models/application';
import { MenuItem } from '../models/menu-item';
import { MenuType } from '../utils/menu-type';
import { User } from '../models/user';
import { UserCookie } from '../models/user-cookie';

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
  public static userFromCookie(cookie: UserCookie): User {
    if (!cookie) {
      return null;
    }
    return new User(cookie.id, cookie.email, cookie.name, cookie.admin, cookie.username);
  }

    /**
   * Fills the 'Applications' menu section with the given applications.
   *
   * @date 2019-01-25
   * @private
   * @param applications to be added into the menu.
   * @param [parent] the menu item parent if exists.
   * @returns the calculated {@link MenuItem} array with the mapped applications.
   * @memberof AppService
   */
  public static populateApplications(applications: Application[], parent?: MenuItem): MenuItem[] {
    if (!parent) {
      parent = new MenuItem(0, MenuType.APPLICATIONS, ['/applications'], 'computer', 1, null, [], true);
    }
    const menu = [ parent ];
    if (!this.isEmptyArray(applications)) {
      for (const application of applications) {
        const appAsMenu = new MenuItem(
          application.idApplication,
          application.name,
          [ '/applications', application.idApplication.toString(), MenuType.getPath(MenuType.APPLICATION) ],
          'cloud_queue', 2, parent, null);
        menu.push(appAsMenu);
        const subMenus = this.getApplicationSubMenu(appAsMenu);
        appAsMenu.children = subMenus;
        for (const subMenu of subMenus) {
          menu.push(subMenu);
        }
        parent.children.push(appAsMenu);
        for (const subMenu of appAsMenu.children) {
          subMenu.parent = appAsMenu;
        }
      }
    }
    return menu;
  }
  
  /**
   * Creates the submenu for the respective application.
   *
   * @date 2019-01-25
   * @private
   * @param application parent of the submenu to be calculated.
   * @returns the {@link MenuItem[]} with the respective children for the application.
   * @memberof AppService
   */
  public static getApplicationSubMenu(application: MenuItem): MenuItem[] {
    const path = [ ...application.path ];
    path.pop();
    return [
      new MenuItem(0, MenuType.GATEWAYS, [ ...path, MenuType.getPath(MenuType.GATEWAYS) ], null, 3, application),
      new MenuItem(0, MenuType.DEVICES, [ ...path, MenuType.getPath(MenuType.DEVICES) ], null, 3, application),
      new MenuItem(0, MenuType.PROCESSES, [ ...path, MenuType.getPath(MenuType.PROCESSES) ], null, 3, application),
    ];
  }

  /**
   * Sets the query params configuration for the given params.
   *
   * @date 2019-01-26
   * @static
   * @param queryParams to be used as query params.
   * @param relativeTo route to add it's parameters.
   * @returns the {@link NavigationExtras}.
   * @memberof Utils
   */
  public static queryParams(queryParams: Params, relativeTo: ActivatedRoute): NavigationExtras {
    return { relativeTo, queryParams, queryParamsHandling: 'merge' };
  }

}
