import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { Process } from 'src/app/shared/models/process';
import { Util } from 'src/app/shared/utils/util';

@Injectable({
  providedIn: CoreModule
})
export class ProcessService {

  public processes: Process[];

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the processes for the given user idenfitied by its id.
   *
   * @date 2019-04-04
   * @param userId - id of the user whose applications are being retrieved.
   * @returns an Array of Processes.
   */
  public getProcessesByUserId(userId: number): Observable<Process[]> {
    return this.http.get<Process[]>(`${ environment.adminService }/processes/user/${ userId }`, Util.options());
  }

}
