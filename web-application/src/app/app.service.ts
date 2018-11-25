import { Injectable } from '@angular/core';
import { HeaderItem, MenuItem } from 'sc-common';

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
  
  constructor() {
    this.isBusyGlobally = false;
    this.isUserCardOpened = false;
    this.isMenuOpened = true;
    this.initializeApp();
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
        new MenuItem(-2, 'Gateways', 'config/gateways', 'memory', 0, null)
      ]),
      new MenuItem(-3, 'Aplicaciones', null, 'computer', 3, [
        new MenuItem(0, 'Parking', 'applications/parking', 'directions_car', 3)
      ]),
    ];
  }

  /**
   * Hides the side menu.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public closeMenu(): void {
    this.isMenuOpened = false;
  }

  /**
   * Triggers a change in the visibility status of the side menu.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public toggleSideMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    console.log('Side menu: ' + this.isMenuOpened);
  }

  /**
   *Triggers a change in the visibility status of the user profile card.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public toggleUserCard(): void {
    this.isUserCardOpened = !this.isUserCardOpened;
  }
}
