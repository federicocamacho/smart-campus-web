/**
 * Maps Backend's Exception names;
 *
 * @date 2018-12-28
 * @export
 * @class ApiException
 */
export class ApiException {

  public static INVALID_KEY = 'InvalidKeyException';

  public static HTTP_ERROR = 'HttpErrorResponse';

  public static TIMEOUT = 'RequestTimeout';

  public static INTERNAL = 'InternalException';

  public static ILLEGAL_ARGUMENT = 'IllegalArgumentException';

  public static BAD_CREDENTIALS  = 'BadCredentialsException';

  public static RECORD_EXISTS = 'RecordExistsException';

}
