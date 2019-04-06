import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'src/app/shared/models/api-response';
import { Application } from 'src/app/shared/models/application';
import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/shared/utils/util';

/**
 * Service to manage applications.
 *
 * @date 2019-04-04
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class ApplicationService {

  /**
   * Stores the applications that belong to the user (if logged in).
   *
   */
  public applications: Application[];

  /**
   * Creates an instance of ApplicationService.
   * @date 2019-04-06
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the application for the given user idenfitied by its id.
   *
   * @date 2019-04-04
   * @param userId - id of the user whose applications are being retrieved.
   * @returns an Array of Applications.
   */
  public getApplicationsForUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${ environment.adminService }/applications/user/${ userId }`, Util.options());
  }

  /**
   * Retrieves the application identified by its id.
   *
   * @date 2019-04-06
   * @param applicationId - id of the Application.
   * @returns the Application.
   */
  public getApplication(applicationId: number): Observable<Application> {
    return this.http.get<Application>(`${ environment.adminService }/applications/application/${ applicationId }`, Util.options());
  }

  /**
   * Deletes the application identified by the given id.
   *
   * @date 2019-04-05
   * @param applicationId - id of the Application to be removed.
   * @returns an ApiResponse indicating if the operation succeeded or not.
   */
  public deleteApplication(applicationId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ environment.adminService }/applications/application/${ applicationId }`, Util.options());
  }

}
