/**
 * Model of elements inside Side menu.
 *
 * @date 2018-06-30
 * @export
 * @class MenuItem
 */
export class MenuItem {

  /**
   * If the item is a parent this property reflects if the second level menu is opened or closed.
   *
   * @type {boolean}
   * @memberof MenuItem
   */
  public areChildrenOpened?: boolean;

  /**
   * Stores current's element children.
   *
   * @type {MenuItem[]}
   * @memberof MenuItem
   */
  public children?: MenuItem[];

  /**
   * Material icon name for this element.
   *
   * @type {string}
   * @memberof MenuItem
   */
  public iconName: string;

  /**
   * Number to identify the menu item.
   *
   * @type {number}
   * @memberof MenuItem
   */
  public id: number;

  /**
   * Menu element name.
   *
   * @type {string}
   * @memberof MenuItem
   */
  public name: string;

  /**
   * Menu element name to navigate using routerLink (absolute or relative paths).
   *
   * @type {string}
   * @memberof MenuItem
   */
  public path: string;

  /**
   * Represents if the current element is the actual navigation page.
   *
   * @type {boolean}
   * @memberof MenuItem
   */
  public selected: boolean;

  /**
   * Creates an instance of Menu Item.
   *
   * @date 2018-06-30
   * @param {number} id
   * @param {string} name
   * @param {string} iconName
   * @param {string} path
   * @memberof MenuItem
   */
  constructor(id: number, name: string, iconName: string, path: string) {
    this.id = id;
    this.name = name;
    this.iconName = iconName;
    this.path = path;
    this.selected = false;
  }
}
