import { User } from '..';

/**
 * Model used for user's authentication input.
 *
 * @date 2018-11-03
 * @export
 * @class LoginInput
 */
export class LoginInput {

  public password: string;

  public username: string;

  /**
   * Creates an instance of LoginInput.
   * @date 2019-01-09
   * @memberof LoginInput
   */
  constructor() {}
}

/**
 * Model used for user's register input.
 *
 * @date 2018-11-03
 * @export
 * @class SigningInput
 */
export class SigningInput {

  public admin: boolean;

  public email: string;

  public name: string;

  public password: string;
  
  public username: string;

  /**
   * Creates an instance of SigningInput.
   * @date 2019-01-09
   * @memberof SigningInput
   */
  constructor() {
    this.admin = false; // no admin user can be created from the platform.
  }

}

/**
 * Model used to update user profile.
 *
 * @date 2019-01-14
 * @export
 * @class UpdateProfileInput
 */
export class UpdateProfileInput {

  public username: string;

  public password: string;

  public email: string;

  public name: string;

  /**
   *Creates an instance of UpdateProfileInput.
   * @date 2019-01-14
   * @memberof UpdateProfileInput
   */
  constructor() {}

  /**
   * Indicates if the input was modified comparing with the passed user.
   *
   * @date 2019-01-14
   * @param user to be compared.
   * @returns true if the input is different, false otherwise.
   * @memberof UpdateProfileInput
   */
  public hasChanges(user: User): boolean {
    return user.name !== this.name || user.email !== this.email;
  }
}

/**
 * Model used for change password input.
 *
 * @date 2019-01-10
 * @export
 * @class ChangePassInput
 */
export class ChangePassInput {

  public oldPass: string;

  public newPass: string;

  /**
   * Creates an instance of ChangePassInput.
   * @date 2019-01-14
   * @param oldPass old password.
   * @param newPass new password.
   * @memberof ChangePassInput
   */
  constructor(oldPass: string, newPass: string) {
    this.oldPass = oldPass;
    this.newPass = newPass;
  }
  
}
