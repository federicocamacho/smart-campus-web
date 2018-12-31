import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, tap } from 'rxjs/operators';

import { ApiError } from '../models/api-error';
import { environment } from '../../../environments/environment';
import { RestUtil } from '../utils/rest-util';

/**
 * Http Interceptors that handles general errors by mapping them into API errors.
 * Also sets the defaul timeout (30 secs) for all requests.
 *
 * @date 2018-12-29
 * @export
 * @class RestInterceptor
 */
@Injectable()
export class RestInterceptor implements HttpInterceptor {
  constructor() { }

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
