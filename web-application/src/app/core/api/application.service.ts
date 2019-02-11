import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Application } from '../models/application';
import { CoreModule } from '../core.module';
import { environment } from './../../../environments/environment';
import { RestUtil } from '../utils/rest-util';

/**
 * Consumes Application related REST Services.
 *
 * @date 2019-01-17
 * @export
 * @class ApplicationService
 */
@Injectable({
  providedIn: CoreModule
})
export class ApplicationService {

  /**
   * Creates an instance of UserService.
   * @date 2019-01-09
   * @param http {@link HttpClient} to execute HTTP Requests.
   * @memberof UserService
   */
  constructor(private http: HttpClient) { }

  /**
   * Consumes the Get Applications by User Id REST Service.
   *
   * @date 2019-01-19
   * @param userId of the {@link User} to find it's Applications.
   * @returns an {@link Observable} with the response.
   * @memberof ApplicationService
   */
  public getApplicationsByUser(userId: number): Observable<any> {
    return this.http
      .get(`${ RestUtil.endpoint(environment.applicationsByUserId) }/${ userId }`,
        RestUtil.options());
  }

  /**
   * Consumes the Get Application by Id REST Service.
   *
   * @date 2019-01-20
   * @param appId of the {@link Application}.
   * @returns an {@link Observable} with the response.
   * @memberof ApplicationService
   */
  public getApplicationById(appId: number): Observable<any> {
    return this.http
      .get(`${ RestUtil.endpoint(environment.application) }/${ appId }`, RestUtil.options());
  }

  /**
   * Consumes the Create Application REST Service.
   *
   * @date 2019-01-30
   * @param application to be created. Not null.
   * @returns an {@link Observable} with the response.
   * @memberof ApplicationService
   */
  public createApplication(application: Application): Observable<any> {
    return this.http
      .post(RestUtil.endpoint(environment.application), application, RestUtil.options());
  }

  /**
   * Consumes the Update Application REST Service.
   *
   * @date 2019-01-30
   * @param appId id of the application to be updated. Not null.
   * @param application to be updated. Not null.
   * @returns an {@link Observable} with the response.
   * @memberof ApplicationService
   */
  public updateApplication(appId: number, application: Application): Observable<any> {
    return this.http
      .put(`${ RestUtil.endpoint(environment.application) }/${ appId }`, application, RestUtil.options());
  }
  
}
