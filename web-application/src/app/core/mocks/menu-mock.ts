import { MenuItem } from '../../shared/models';

/**
 *Mock for Menu Items
 *
 * @author Federico Camacho
 * @date 2018-06-30
 * @export
 * @class MenuMock
 */
export class MenuMock {

  /**
   *Stores mocked menu items
   *
   * @type {MenuItem[]}
   * @memberof MenuMock
   */
  public menu: MenuItem[];

  /**
   *Creates an instance of MenuMock.
   * @author Federico Camacho
   * @date 2018-06-30
   * @memberof MenuMock
   */
  constructor() {
    this.menu = this.generateMenu();
  }

  /**
   *Generates Menu Items.
   *
   * @author Federico Camacho
   * @date 2018-06-30
   * @returns {MenuItem[]}
   * @memberof MenuMock
   */
  public generateMenu(): MenuItem[] {
    const item0: MenuItem = new MenuItem(0, 'Opcion 0', 'home', '');
    const item1: MenuItem = new MenuItem(1, 'Opcion 1', 'assignment', 'assignment');
    const item2: MenuItem = new MenuItem(2, 'Opcion 2', 'build', 'build');
    const item3: MenuItem = new MenuItem(3, 'Opcion 3', 'delete', 'delete');
    const item4: MenuItem = new MenuItem(4, 'Opcion 4', 'grade', 'grade');
    const item5: MenuItem = new MenuItem(5, 'Opcion 5', 'favorite', 'favorite');
    const item6: MenuItem = new MenuItem(6, 'Opcion 6', 'security', 'security');
    const item7: MenuItem = new MenuItem(7, 'Opcion 7', 'toys', 'toys');
    const item8: MenuItem = new MenuItem(8, 'Opcion 8', 'palette', 'palette');
    const item9: MenuItem = new MenuItem(9, 'Opcion 9', 'music_note', 'music');
    item3.children = [ item6, item7, item8 ];
    item5.children = [ item9 ];
    const items = [item0, item1, item2, item3, item4, item5];
    return items;
  }
}
