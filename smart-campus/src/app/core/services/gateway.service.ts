import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Gateway } from 'src/app/shared/models/gateway';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/shared/utils/util';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Injectable({
  providedIn: CoreModule
})
export class GatewayService {

  /**
   * Stores the gateways of the logged user.
   *
   */
  public gateways: Gateway[];

  /**
   * Creates an instance of GatewayService.
   * @date 2019-04-06
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the gateways for the given user idenfitied by its id.
   *
   * @date 2019-04-04
   * @param userId - id of the user whose gateways are being retrieved.
   * @returns an Array of Gateways.
   */
  public getGatewaysByUserId(userId: number): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${ environment.adminService }/gateways/user/${ userId }`, Util.options());
  }

  /**
   * Retrieves the gateway identified by its id.
   *
   * @date 2019-04-06
   * @param gatewayId - id of the Gateway.
   * @returns the Gateway.
   */
  public getGatewayById(gatewayId: number): Observable<Gateway> {
    return this.http.get<Gateway>(`${ environment.adminService }/gateways/gateway/${ gatewayId }`, Util.options());
  }

  /**
   * Deletes the gateway identified by the given id.
   *
   * @date 2019-04-05
   * @param gatewayId - id of the Gateway to be removed.
   * @returns an ApiResponse indicating if the operation succeeded or not.
   */
  public deleteGatewayById(gatewayId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ environment.adminService }/gateways/gateway/${ gatewayId }`, Util.options());
  }
}
