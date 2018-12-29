import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, tap } from 'rxjs/operators';
import { RestUtil } from '../api/rest-util';
import { ApiError } from '../models';

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
      timeout(30000),
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
