import { ApiException } from './api-exception';

/**
 * Maps the error obtained from the backend.
 *
 * @date 2018-12-29
 * @export
 * @class ApiError
 */
export class ApiError {

  /**
   * Http error code message.
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
   * Timestamp that indicates when the error is generated.
   *
   * @memberof ApiError
   */
  public timestamp: Date;

  /**
   * User messae.
   *
   * @memberof ApiError
   */
  public message: string;

  /**
   * Exception class name. Use {@link ApiException } for class names.
   *
   * @memberof ApiError
   */
  public exception: String;

  constructor(status?: string, statusCode?: number, timestamp?: Date, message?: string, exception?: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
    this.exception = exception;
  }
  
  /**
   * Creates a generic (internal server error) ApiError.
   *
   * @date 2018-12-29
   * @static
   * @returns the error created.
   * @memberof ApiError
   */
  public static fromGeneric(): ApiError {
    return new ApiError('INTERNAL_SERVER_ERROR', 505, new Date(), 
      'Un error ocurrió por favor intentelo más tarde.', ApiException.INTERNAL);
  }

  /**
   * Creates the needed ApiError from timeout.
   *
   * @date 2018-12-29
   * @static
   * @returns the error created.
   * @memberof ApiError
   */
  public static timeoutError(): ApiError {
    const apiError = new ApiError('REQUEST_TIMEOUT', 408, new Date(), 
    'La petición hizo timeout, por favor intentelo más tarde.', ApiException.TIMEOUT);
    console.error('API ERROR', apiError);
    return apiError;
  }
}
