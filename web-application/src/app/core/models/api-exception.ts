/**
 * Maps the Backend Exception names;
 *
 * @date 2018-12-28
 * @export
 * @class ApiException
 */
export class ApiException {

  public static HTTP_ERROR = 'HttpErrorResponse';
  public static TIMEOUT = 'RequestTimeout';
  public static INTERNAL = 'InternalException';
  public static ILLEGAL_ARGUMENT = 'IllegalArgumentException';
  public static USER_EXISTS  = 'UserExistsException';
}
