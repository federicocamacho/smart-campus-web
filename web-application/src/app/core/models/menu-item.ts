/**
 * Represents a single option found in the side menu.
 *
 * @date 2018-10-31
 * @export
 */
export class MenuItem {

  public icon: string;

  public id: number;

  public isExpanded: boolean;

  public children: MenuItem[];

  public name: string;

  public path: string[];

  public level: number;

  /**
   * Creates an instance of MenuItem.
   * @date 2019-01-09
   * @param id of the item.
   * @param name of the item.
   * @param path of the item page's.
   * @param level of the item in the structure.
   * @param icon of the item. Use material icons names.
   * @param [children] an array of {@link MenuItem} that are children nodes.
   * @memberof MenuItem
   */
  constructor(
    id: number,
    name: string,
    path: string[],
    icon: string,
    level: number,
    children?: MenuItem[],
    isExpanded = false) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.level = level;
    this.isExpanded = false;
    this.children = children;
    this.isExpanded = isExpanded;
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
  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Collapses the current node.
   *
   * @date 2019-01-22
   * @memberof TreeNode
   */
  public collapse(): void {
    this.isExpanded = false;
  }

  /**
   * Expands the current node.
   *
   * @date 2019-01-22
   * @memberof TreeNode
   */
  public expand(): void {
    this.isExpanded = true;
  }

  /**
   * Collapses all the children nodes.
   *
   * @date 2019-01-22
   * @memberof TreeNode
   */
  public collapseChildren(): void {
    if (this.children === null) { return; }

    this.collapse();

    if (this.children.length > 0) {
      this.children.forEach(children => children.collapseChildren());
    }
    
  }

  /**
   * Expands all the children nodes.
   *
   * @date 2019-01-22
   * @memberof TreeNode
   */
  public expandChildren(): void {
    if (this.children === null) { return; }
    
    this.expand();

    if (this.children.length > 0) {
      this.children.forEach(children => children.expandChildren());
    }
  }

  /**
   * Toggles the expand state for all children nodes.
   *
   * @date 2019-01-22
   * @memberof TreeNode
   */
  public toggleChildren(): void {
    if (this.children === null) { return; }
    
    this.toggleExpand();

    if (this.children.length > 0) {
      this.children.forEach(children => children.toggleChildren());
    }
  }
  
}
