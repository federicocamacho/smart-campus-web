import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { LoginInput, Response, RestUtil, SigningInput, User } from '..';
import { UpdateProfileInput, ChangePassInput } from '../models/auth';

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
   * @returns an {@link Observable} with the response.
   * @memberof UserService
   */
  public register(user: SigningInput): Observable<any> {
    return this.http
      .post<HttpResponse<User>>(RestUtil.endpoint(environment.user), user, RestUtil.options());
  }

  /**
   * Consumes login REST service.
   *
   * @date 2018-12-29
   * @param user to be authenticated.
   * @returns an {@link Observable} with the response.
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
   * @returns an {@link Observable} with the response.
   * @memberof UserService
   */
  public deleteUser(id: number): Observable<any> {
    return this.http
      .delete<HttpResponse<Response>>(`${ RestUtil.endpoint(environment.user) }/${ id }`,
        RestUtil.options());
  }

  /**
   * Consumes the Retrieve user password REST service.
   *
   * @date 2019-01-10
   * @param email of the user whose password is going to be retrieved.
   * @returns an {@link Observable} with the response.
   * @memberof UserService
   */
  public retrievePassword(email: string): Observable<any> {
    return this.http
      .get<HttpResponse<Response>>(`${ RestUtil.endpoint(environment.retrievePwd) }/${ email }`,
        RestUtil.options());
  }

  /**
   * Consumes the update profile REST service.
   *
   * @date 2019-01-14
   * @param userId id of the user whose profile is updated.
   * @param body {@link UpdateProfileInput} updated profile.
   * @returns an {@link Observable} with the response.
   * @memberof UserService
   */
  public updateProfile(userId: number, body: UpdateProfileInput): Observable<any> {
    return this.http
      .put<HttpResponse<User>>(`${ RestUtil.endpoint(environment.user) }/${ userId }`, body,
      RestUtil.options());
  }

  /**
   * Consumes the update password REST service.
   *
   * @date 2019-01-14
   * @param userId id of the user whose password is updated.
   * @param body {@link ChangePassInput} updated password.
   * @returns an {@link Observable} with the response.
   * @memberof UserService
   */
  public changePassword(userId: number, body: ChangePassInput): Observable<any> {
    return this.http
      .put<HttpResponse<Response>>(`${ RestUtil.endpoint(environment.updatePwd) }/${ userId }`, body,
      RestUtil.options());
  }

}
