import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { environment } from './../../../environments/environment';
import { RestUtil } from '..';

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
      .get(`${ RestUtil.endpoint(environment.user) }/${ userId }`, RestUtil.options());
  }
  
}
