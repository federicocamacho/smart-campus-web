import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from 'src/app/core/core.module';
import { Data } from 'src/app/shared/models/data';
import { DataFilter } from 'src/app/shared/models/types';

import { environment } from 'src/environments/environment';
import { Util } from 'src/app/shared/utils/util';
import { DataStatistic } from 'src/app/shared/models/data-statistic';

@Injectable({
  providedIn: CoreModule
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the device identified by its id.
   *
   */
  public getData(filterType: string, filterValue: string | number, startDate: Date, endDate: Date): Observable<Data[]> {
    let query = '';
    switch (filterType) {
      case 'APPLICATION':
        query += 'applicationId='; break;
      case 'GATEWAY':
        query += 'gatewayId='; break;
      case 'PROCESS':
        query += 'processId='; break;
      case 'TOPIC':
        query += 'topic='; break;
    }
    query += filterValue;
    query += '&initialDate=' + Util.formatDate(startDate);
    query += '&endDate=' + Util.formatDate(endDate);
    return this.http.get<Data[]>(`${ environment.dataService }/data/historic?${ query }`, Util.options());
  }

  /**
   * Returns the statistics calculated in the backend.
   */
  public getStatistics(userId: number): Observable<DataStatistic[]> {
    return this.http.get<DataStatistic[]>(`${environment.dataService}/data/statistics/${userId}`, Util.options());
  }

}
