import { MenuItem } from './menu-item';
import { Application } from './application';
import { MenuType } from '../utils/menu-type';
import { Utils } from '../utils/utils';

/**
 * Utility class for Menu items. Mostly used as type and for util methods.
 *
 * @date 2019-01-25
 * @export
 * @class MenuTree
 */
export class MenuTree {

  /**
   * Menu items.
   *
   * @memberof MenuTree
   */
  public items: MenuItem[];

  /**
   * Creates an instance of MenuTree.
   * @date 2019-01-25
   * @memberof MenuTree
   */
  constructor() {
    this.items = [];
  }

  /**
   * Returns the visible Menu Items.
   *
   * @date 2019-01-28
   * @returns the visible items. Never null.
   * @memberof MenuTree
   */
  public getVisible(): MenuItem[] {
    return this.items.filter(item => !item.parent || item.parent.isExpanded);
  }

  /**
   * Calculates the index of the menu items in which a new menu item can be inserted for a given parent node.
   *
   * @date 2019-01-30
   * @param menuType name of the type of the menu (first level item), use {@link MenuType} to use known levels.
   * @returns the index on which the new item(s) can be inserted
   * @memberof MenuTree
   */
  public getInsertionIndexForType(menuType: string): number {
    // find the index of the next parent item that's not the given type to insert the items before it.
    const nextParentIndex = this.items
      .findIndex(item => item.level === 1 && item.name !== menuType);
    // if no other parent was found, then insert the items at the end.
    return nextParentIndex === -1 ? this.items.length : nextParentIndex - 1;
  }

  /**
   * Inserts multiple new items into the tree for a given type (level 1 node).
   *
   * @date 2019-01-30
   * @param menuType type of the items to be inserted. Use known 1st levelt items using {@link MenuType}.
   * @param items the items to be inserted.
   * @memberof MenuTree
   */
  public insertForType(menuType: string, items: MenuItem[]): void {
    this.items.splice(this.getInsertionIndexForType(menuType), 0, ...items);
  }

  /**
   * Transforms the given applications into menu items, adding also their children elements
   * and seeting it's parent to the reference of the existing 'Applications' parent item.
   *
   * @date 2019-01-30
   * @param applications to be transformed. If null or empty then an empty array is returned.
   * @returns the applications as menu items.
   * @memberof MenuTree
   */
  public mapApplicationsToMenuItems(applications: Application[]): MenuItem[] {
    const applicationsParent = this.findParent(MenuType.APPLICATIONS);
    const items = [];
    if (!Utils.isEmptyArray(applications)) {
      for (const application of applications) {
        const appAsMenu = new MenuItem(
          application.idApplication,
          application.name,
          [ ...applicationsParent.path, application.idApplication.toString() ],
          'cloud_queue', 2, applicationsParent, null);
        items.push(appAsMenu);
        applicationsParent.children.push(appAsMenu);
      }
    }
    return items;
  }

  /**
   * Returns a reference to the parent item for the given menu type.
   *
   * @date 2019-01-30
   * @param menuType type of the parent to be retrieved. Use {@link MenuType}.
   * @returns the item if exists, undefined otherwise.
   * @memberof MenuTree
   */
  public findParent(menuType: string): MenuItem {
    return this.items.find(item => item.level === 1 && item.name === menuType);
  }

}
