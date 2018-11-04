import { StringUtils } from '../../utils/string-utils';

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

  constructor(id?: number, name?: string, path?: string, icon?: string, notCount?: number) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.notificationCount = notCount;
    this.isOpened = false;
  }
  
  /**
   * Check if the item has an icon.
   *
   * @date 2018-11-04
   * @returns
   * @memberof MenuItem
   */
  hasIcon(): boolean {
    return StringUtils.isNullOrEmpty(this.icon);
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
}