/**
 * Represents a User in the Application context.
 *
 * @date 2018-12-27
 * @export
 * @class User
 */
export class User {

  public id: number;

  public email: string;

  public name: string;

  public admin: boolean;
  
  public username: string;

  /**
   * Creates an instance of User.
   * @date 2019-01-14
   * @param id of the user.
   * @param email of the user.
   * @param name of the user.
   * @param admin indicates if the user is an administrator or not.
   * @param username of the user.
   * @memberof User
   */
  constructor(id: number, email: string, name: string, admin: boolean, username: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.admin = admin;
    this.username = username;
  }

}
