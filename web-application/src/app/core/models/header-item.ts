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

  constructor(id: number, name: string, iconName: string, action: Function) {
    this.id = id;
    this.name = name;
    this.iconName = iconName;
    this.action = action;
  }
}
