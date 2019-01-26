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
  items: MenuItem[];

  /**
   * Creates an instance of MenuTree.
   * @date 2019-01-25
   * @memberof MenuTree
   */
  constructor() {
    this.items = [];
  }
}
