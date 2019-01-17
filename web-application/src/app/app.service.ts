import { Injectable } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { HeaderItem, MenuItem, UserCookie, User, Utils } from './core';

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
  public user: User;

  /**
   * Creates an instance of AppService.
   * @date 2019-01-09
   * @param cookieService User Cookie service.
   * @memberof AppService
   */
  constructor(private cookieService: CookieService) {
    this.isBusyGlobally = false;
    this.isUserCardOpened = false;
    this.isMenuOpened = true;
    this.initializeApp();
    const cookie = UserCookie.fromJSON(this.cookieService.get('user'));
    this.user = Utils.userFromCookie(cookie);
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
   * Indicates if the user is authenticated or not checking if the {@link UserCookie} exists.
   *
   * @date 2019-01-09
   * @returns true if the user is authenticated, false otherwise.
   * @memberof AppService
   */
  public isAuthenticated(): boolean {
    if (this.cookieService.check('user')) {
      const user: UserCookie = UserCookie.fromJSON(this.cookieService.get('user'));
      return user != null;
    }
    return false;
  }

  /**
   * Determines if the given form (NgForm) is invalid or not.
   *
   * @date 2019-01-10
   * @param form {@link NgForm} to be evaluated.
   * @returns true if the form is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isFormInvalid(form: NgForm): boolean {
    return form.form.invalid && (form.form.dirty || form.form.touched);
  }

  /**
   * Determines if the given model (NgModel) is invalid or not.
   *
   * @date 2019-01-10
   * @param model {@link NgModel} to be evaluated.
   * @returns true if the model is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isModelInvalid(model: NgModel): boolean {
    return model.invalid && (model.dirty || model.touched);
  }
  
}
