/**
 * Stores the App default application options for the side menu.
 *
 * @date 2019-01-20
 * @export
 * @class MenuType
 */
export class MenuType {
  
  public static APPLICATIONS = 'Aplicaciones';

  public static APPLICATION = 'Aplicación';

  public static GATEWAYS = 'Gateways';

  public static DEVICES = 'Dispositivos';
  
  public static PROCESSES = 'Procesos';

  /**
   * Obtains the path for the given section name.
   *
   * @date 2019-01-27
   * @static
   * @param section name (use MenuType.{value}).
   * @returns the section of the path, empty string if the path doesn't exist.
   * @memberof MenuType
   */
  public static getPath(section: string): string {
    switch (section) {
      case this.APPLICATION:
        return 'aplication';
      case this.DEVICES:
        return 'devices';
      case this.GATEWAYS:
        return 'gateways';
      case this.PROCESSES:
        return 'processes';
      default:
        return '';
    }
  }

  /**
   * Obtains the path for the respective Wizard index.
   *
   * @date 2019-01-27
   * @static
   * @param index of the wizard section.
   * @returns the sub path for the given item, an empty string if the index doesn't match.
   * @memberof MenuType
   */
  public static getPathFromIndex(index: number): string {
    return this.getPath(this.fromIndex(index));
  }

  /**
   * Obtains the index of the Wizard step for the given path name.
   *
   * @date 2019-01-27
   * @static
   * @param path to obtain it's index.
   * @returns the index for the Wizard step, null if the path doesn't match any entry.
   * @memberof MenuType
   */
  public static getIndexFromPath(path: string): number {
    switch (path) {
      case 'gateways':
        return 1;
      case 'devices':
        return 2;
      case 'processes':
        return 3;
      default:
        return 0;
    }
  }

  /**
   * Obtains the menu name for the passed index (Wizard step).
   *
   * @date 2019-01-27
   * @static
   * @param index of the Wizard step.
   * @returns the MenuType name for the given index, null if the index doesn't exist.
   * @memberof MenuType
   */
  public static fromIndex(index: number): string {
    switch (index) {
      case 0:
        return this.APPLICATION;
      case 1:
        return this.GATEWAYS;
      case 2:
        return this.DEVICES;
      case 3:
        return this.PROCESSES;
      default:
        return null;
    }
  }

}
