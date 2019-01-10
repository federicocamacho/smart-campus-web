/**
 * Bean that represents a Navbar option item.
 *
 * @date 2018-10-31
 * @export
 */
export class HeaderItem {
  
  public id: number;

  public name: string;

  public action: Function;

  public iconName: string;

  /**
   * Creates an instance of HeaderItem.
   * @date 2019-01-09
   * @param id of the item.
   * @param name of the item.
   * @param iconName of the item. Use material icons names.
   * @param action to be executed when selecting the item.
   * @memberof HeaderItem
   */
  constructor(id: number, name: string, iconName: string, action: Function) {
    this.id = id;
    this.name = name;
    this.iconName = iconName;
    this.action = action;
  }
  
}
