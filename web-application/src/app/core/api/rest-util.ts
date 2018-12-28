import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ApiError } from '../models';

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
   * @returns an Observable with the APIError.
   * @memberof RestUtil
   */
  public static handleError(error: HttpErrorResponse): Observable<never> {
    let apiError: ApiError = null;
    if (error.error instanceof ErrorEvent) {
      apiError = ApiError.ofGeneric();
      apiError.message += ` ${ error.error.message }.`;
    } else {
      apiError = error.error;
      apiError.statusCode = error.status;
    }
    console.error(apiError);
    return throwError(apiError);
  }
  
}
