import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, tap } from 'rxjs/operators';

import { ApiError } from '../models/api-error';
import { environment } from '../../../environments/environment';
import { RestUtil } from '../utils/rest-util';

/**
 * Http Interceptors that handles general errors by mapping them into API errors.
 * Also sets the defaul timeout to the requests obtained from environments.
 *
 * @date 2018-12-29
 * @export
 * @class RestInterceptor
 */
@Injectable()
export class RestInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of RestInterceptor.
   * @date 2019-01-09
   * @memberof RestInterceptor
   */
  constructor() { }

  /**
   * Intercepts the http requests.
   *
   * @date 2019-01-09
   * @param req request to be intercepted.
   * @param next HTTP request handler.
   * @returns an Observable wraping an HttpEvent to continue with the request.
   * @memberof RestInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(environment.timeout),
      tap(
        res => {},
        err => {
          if (err instanceof HttpErrorResponse) {
            throw(RestUtil.handleError(err));
          } else if (err instanceof Error) {
            throw(ApiError.timeoutError());
          }
      })
    );
  }
}
