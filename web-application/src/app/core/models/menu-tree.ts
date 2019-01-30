import { MenuItem } from './menu-item';

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

}
