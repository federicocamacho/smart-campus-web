import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestUtil } from './rest-util';
import { environment } from 'src/environments/environment';
import { SigningInput, IUser } from '../models';
import { catchError } from 'rxjs/operators';

/**
 * Consumes User related REST Services.
 *
 * @date 2018-12-27
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: CoreModule
})
export class UserService {

  constructor(private http: HttpClient) { }

  public register(user: SigningInput): Observable<any> {
    return this.http
      .put<IUser>(RestUtil.endpoint(environment.registerEndpoint), user, RestUtil.options())
      .pipe(
        catchError(RestUtil.handleError)
      );
  }
}
