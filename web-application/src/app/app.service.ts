import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { IUser, HeaderItem, MenuItem, UserCookie } from './core';

/**
 * Service to handle all app-wide data and event handlers.
 *
 * @date 2018-10-31
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {

  /**
   * Stores the list of elements displayed in the {@link HeaderComponent } used as options.
   *
   * @memberof AppService
   */
  public headerItems: HeaderItem[];

  /**
   * Represents if there's an operation in progress that should block the user interaction.
   * It's binded to the display of the {@link FullScreenLoaderComponent}.
   *
   * @memberof AppService
   */
  public isBusyGlobally: boolean;

  /**
   * Represents whether the user is loged in the application or not.
   *
   * @memberof AppService
   */
  public isLogedIn: boolean;
  
  /**
   * Determines whether the user profile is opened or not.
   *
   * @memberof AppService
   */
  public isUserCardOpened: boolean;

  /**
   * Determines whether the side menu (of type {@link MenuComponent}) is opened (displayed) or not.
   *
   * @memberof AppService
   */
  public isMenuOpened: boolean;

  /**
   * Stores all the side menu elements.
   *
   * @memberof AppService
   */
  public menuItems: MenuItem[];

  /**
   * Stores the user logged in.
   *
   * @memberof AppService
   */
  public user: IUser;
  
  constructor(private cookieService: CookieService) {
    this.isBusyGlobally = false;
    this.isUserCardOpened = false;
    this.isMenuOpened = true;
    this.initializeApp();
    const cookie = UserCookie.fromJSON(this.cookieService.get('user'));
    this.user = this.userFromCookie(cookie);
  }

  /**
   * Creates all navbar items and menu items.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public initializeApp(): void {
    this.headerItems = [
      new HeaderItem(0, 'Notifications', 'notifications_none', () => console.log('action')),
      new HeaderItem(0, 'Messages', 'email', () => console.log('action'))
    ];
    this.menuItems = [
      new MenuItem(-1, 'Configuración', null, 'settings', 0, [
        new MenuItem(-2, 'Gateways', 'config/gateways', 'memory', 0)
      ]),
      new MenuItem(-3, 'Aplicaciones', null, 'computer', 3, [
        new MenuItem(0, 'Parking', 'applications/parking', 'directions_car', 3)
      ]),
    ];
  }
  
  /**
   * Maps a UserCookie into a User.
   *
   * @date 2018-12-30
   * @param cookie to be mapped. Nullable.
   * @returns the user, null if the cookie is null.
   * @memberof Utils
   */
  public userFromCookie(cookie: UserCookie): IUser {
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
