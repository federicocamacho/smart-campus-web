import { ApiException } from './api-exception';
import { Utils } from '../utils/utils';

/**
 * Maps the error obtained from the backend.
 *
 * @date 2018-12-29
 * @export
 * @class ApiError
 */
export class ApiError {

  /**
   * Http error code as a string.
   *
   * @memberof ApiError
   */
  public status: string;

  /**
   * Http error code.
   *
   * @memberof ApiError
   */
  public statusCode: number;

  /**
   * Timestamp that indicates when the error was generated.
   *
   * @memberof ApiError
   */
  public timestamp: Date;

  /**
   * User friendly message about the error.
   *
   * @memberof ApiError
   */
  public message: string;

  /**
   * Exception class name. Use {@link ApiException} for class names.
   *
   * @memberof ApiError
   */
  public exception: String;

  /**
   * Creates an instance of ApiError.
   * @date 2019-01-09
   * @param status Http error code as a string.
   * @param statusCode Http error code.
   * @param message User friendly message about the error.
   * @param exception Exception class name.
   * @memberof ApiError
   */
  constructor(status: string, statusCode: number, message: string, exception: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.timestamp = new Date();
    this.message = message;
    this.exception = exception;
  }

  /**
   * Creates a generic (INTERNAL_SERVER_ERROR) ApiError.
   *
   * @date 2018-12-29
   * @static
   * @returns the error created.
   * @memberof ApiError
   */
  public static fromGeneric(): ApiError {
    return new ApiError('INTERNAL_SERVER_ERROR', 505,
      'Un error ocurrió por favor intentelo más tarde.', ApiException.INTERNAL);
  }

  /**
   * Creates and logs in the console the needed ApiError when an HTTP Request timeout occurred.
   *
   * @date 2018-12-29
   * @static
   * @returns the {@link ApiError} error equivalent of a timeout error.
   * @memberof ApiError
   */
  public static timeoutError(): ApiError {
    const apiError = new ApiError('REQUEST_TIMEOUT', 408,
      'La petición hizo timeout, por favor intentelo más tarde.', ApiException.TIMEOUT);
    console.error('API ERROR', apiError);
    return apiError;
  }

  /**
   * Verifies if the API Error cames from the same exception as the given exception name (or names).
   *
   * @date 2019-01-16
   * @param exception the name (or multiple names as an array) of the exception(s) to check. Nullable.
   * @returns true if the passed name or any of the passed names match with this error, false otherwise.
   * @memberof ApiError
   */
  public is(...exception: string[]): boolean {
    if (Utils.isEmptyArray(exception)) {
      return false;
    }

    for (const exc of exception) {
      if (exc === this.exception) {
        return true;
      }
    }
    
    return false;
  }

}
