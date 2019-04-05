import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Application } from 'src/app/shared/models/application';
import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/shared/utils/util';
import { MatTableDataSource } from '@angular/material';
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

}
