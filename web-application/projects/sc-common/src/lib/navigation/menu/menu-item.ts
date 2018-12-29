import { Utils } from '../../utils/utils';

/**
 * Represents a single option found in the side menu.
 *
 * @date 2018-10-31
 * @export
 */
export class MenuItem {
  id: number;
  icon: string;
  name: string;
  path: string;
  children: MenuItem[];
  notificationCount: number;
  isOpened: boolean;

  constructor(id?: number, name?: string, path?: string, icon?: string, notCount?: number, children?: MenuItem[]) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.notificationCount = notCount;
    this.isOpened = false;
    this.children = children;
  }
  
  /**
   * Check if the item has an icon.
   *
   * @date 2018-11-04
   * @returns
   * @memberof MenuItem
   */
  hasIcon(): boolean {
    return !Utils.isEmptyString(this.icon);
  }
  
  /**
   * Checks if the item has notifications
   *
   * @date 2018-11-04
   * @returns
   * @memberof MenuItem
   */
  hasNotifications(): boolean {
    return this.notificationCount && this.notificationCount > 0;
  }

  /**
   * Checks if the current item has children
   *
   * @date 2018-11-17
   * @returns
   * @memberof MenuItem
   */
  hasChildren(): boolean {
    return this.children && this.children.length > 0;
  }

  /**
   * Change item opened state.
   *
   * @date 2018-11-17
   * @memberof MenuItem
   */
  toggleOpen(): void {
    this.isOpened = !this.isOpened;
  }
}
