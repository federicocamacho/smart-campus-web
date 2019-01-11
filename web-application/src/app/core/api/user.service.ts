import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { IResponse, User, LoginInput, RestUtil, SigningInput } from '..';

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

  /**
   * Creates an instance of UserService.
   * @date 2019-01-09
   * @param http {@link HttpClient} to execute HTTP Requests.
   * @memberof UserService
   */
  constructor(private http: HttpClient) { }

  /**
   * Consumes Signing (register user) REST service.
   *
   * @date 2018-12-29
   * @param user to be created.
   * @returns an Observable with the response.
   * @memberof UserService
   */
  public register(user: SigningInput): Observable<any> {
    return this.http
      .post<HttpResponse<User>>(RestUtil.endpoint(environment.register), user, RestUtil.options());
  }

  /**
   * Consumes login REST service.
   *
   * @date 2018-12-29
   * @param user to be authenticated.
   * @returns an Observable with the response.
   * @memberof UserService
   */
  public login(user: LoginInput): Observable<any> {
    return this.http
      .post<HttpResponse<User>>(RestUtil.endpoint(environment.authentication), user, RestUtil.options());
  }

  /**
   * Consumes delete user by id REST service.
   *
   * @date 2018-12-31
   * @param id of the user to be deleted.
   * @returns an Observable with the response.
   * @memberof UserService
   */
  public deleteUser(id: number): Observable<any> {
    return this.http
      .delete<HttpResponse<IResponse>>(`${RestUtil.endpoint(environment.deleteUser)}/${id}`,
        RestUtil.options());
  }

}
