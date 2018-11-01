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
  
  hasIcon(): boolean {
    return this.icon && this.icon !== '';
  }
  
  hasNotifications(): boolean {
    return this.notificationCount && this.notificationCount > 0;
  }
}