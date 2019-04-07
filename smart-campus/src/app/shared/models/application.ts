import { Gateway } from './gateway';

/**
 * Represents an Application.
 *
 * @date 2019-03-30
 * @export
 */
export class Application {

  public id: number;
  public name: string;
  public userId: number;
  public description: string;
  public gateways: Gateway[];

  /**
   * Creates an instance of Application.
   * @date 2019-03-30
   * @param id of the Application.
   * @param name of the Application.
   * @param description of the Application.
   * @param userId of the owner of the Application.
   */
  constructor(id?: number, name?: string, description?: string, userId?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
  }
}
