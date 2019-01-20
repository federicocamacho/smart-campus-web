/**
 * Represents a single option found in the side menu.
 *
 * @date 2018-10-31
 * @export
 */
export class MenuItem {

  public icon: string;

  public id: number;

  public isOpened: boolean;

  public children: MenuItem[];

  public name: string;

  public path: string[];

  /**
   * Creates an instance of MenuItem.
   * @date 2019-01-09
   * @param id of the item.
   * @param name of the item.
   * @param path of the item page's.
   * @param icon of the item. Use material icons names.
   * @param [children] an array of {@link MenuItem} that are children nodes.
   * @memberof MenuItem
   */
  constructor(id: number, name: string, path: string[], icon: string, children?: MenuItem[]) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.isOpened = false;
    this.children = children;
  }
  
  /**
   * Checks if the item has an icon.
   *
   * @date 2018-11-04
   * @returns true if the icon is present, false otherwise.
   * @memberof MenuItem
   */
  public hasIcon(): boolean {
    return this.icon && this.icon.trim() !== '';
  }

  /**
   * Checks if the current item has children
   *
   * @date 2018-11-17
   * @returns true if there's at least one children, false otherwise.
   * @memberof MenuItem
   */
  public hasChildren(): boolean {
    return this.children && this.children.length > 0;
  }

  /**
   * Changes item opened state.
   *
   * @date 2018-11-17
   * @memberof MenuItem
   */
  public toggleOpen(): void {
    this.isOpened = !this.isOpened;
  }
  
}
