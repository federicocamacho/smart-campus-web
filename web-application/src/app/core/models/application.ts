/**
 * Represents the Application object.
 *
 * @date 2019-01-20
 * @export
 * @class Application
 */
export class Application {

  /**
   * Application id.
   *
   * @memberof Application
   */
  public id: number;

  /**
   * Application name.
   *
   * @memberof Application
   */
  public name: string;

  /**
   * User id.
   *
   * @memberof Application
   */
  public userId: number;

  /**
   * Applciation description
   *
   * @memberof Application
   */
  public description: string;

  /**
   * Creates an instance of Application.
   * @date 2019-01-19
   * @param id of the Application.
   * @param name of the Application.
   * @param description of the Application.
   * @param userId that owns the of the Application.
   * @memberof Application
   */
  constructor(id?: number, name?: string, description?: string, userId?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
  }

}
