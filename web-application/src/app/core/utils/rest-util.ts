import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiError } from '../models/api-error';
import { environment } from '../../../environments/environment.prod';

/**
 * Contains all REST (consuming) utility methods.
 *
 * @date 2018-12-27
 * @export
 * @class RestUtil
 */
export class RestUtil {

  /**
   * Returns the full HTTP endpoint for the given service endpoint string.
   *
   * @date 2018-12-27
   * @static
   * @param serviceEndpoint endpoint of the desired service (with trailing slash).
   * @returns the full HTTP endpoint.
   * @memberof RestUtil
   */
  public static endpoint(serviceEndpoint: string): string {
    return environment.endpoint + serviceEndpoint;
  }

  /**
   * Returns the default Http Options used for REST requests.
   *
   * @date 2018-12-27
   * @static
   * @returns the HttpOtions object.
   * @memberof RestUtil
   */
  public static options(): any {
    return {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        observe: 'response'
    };
  }

  /**
   * Handles HTTP request error due an exception or domain error response.
   *
   * @date 2018-12-27
   * @private
   * @param error the error obtained.
   * @returns the APIError.
   * @memberof RestUtil
   */
  public static handleError(error: HttpErrorResponse): ApiError {
    let apiError: ApiError = null;
    if (error.error instanceof ErrorEvent) {
      apiError = ApiError.fromGeneric();
      apiError.message += ` ${ error.error.message }.`;
    } else if (!(error.error instanceof ProgressEvent)) { // API error
      apiError = error.error;
      apiError.statusCode = error.status;
    } else { // Http Errors
      apiError = ApiError.fromGeneric();
      apiError.exception = error.name;
    }
    console.error('API ERROR', apiError);
    return apiError;
  }
  
}
